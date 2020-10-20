const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('Get Friends Queue Router');
  const queryText = `SELECT "user"."id", "movie"."title", "movie"."poster_url","movie"."movie_table_id","movie"."description", "movie"."type", "friend_movie"."status", "friend_movie"."fm_table_id" FROM "user"
  JOIN "friend_movie"
  ON "user"."id" = "friend_movie"."friend_id"
  JOIN "movie"
  ON "friend_movie"."movie_id" = "movie"."movie_table_id"
  WHERE "user"."id" != $1
  ORDER BY "movie"."title";`;
  pool.query(queryText, [req.user.id])
  .then((result) => { res.send(result.rows); 
  }).catch((err) => {
  console.error('ERROR IN GET/ queue', err);
  res.sendStatus(500);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  console.log('Add Rec POST router got a hit', req.body);
  const queryText = `INSERT INTO "friend_movie" ("friend_id", "movie_id")
  VALUES ($1, $2)`
  pool.query(queryText, [req.user.id, req.body.id])
  .then(result => {
    res.sendStatus(201);
  }).catch(err => {
    console.error('Failed in create media', err);
    res.sendStatus(500);
  });
});




module.exports = router;
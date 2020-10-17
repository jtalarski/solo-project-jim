const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  console.log('Get Queue Router');
  const queryText = `SELECT "user"."id", "movie"."title", "friend_movie"."status", "friend_movie"."fm_table_id" FROM "user"
  JOIN "friend_movie"
  ON "user"."id" = "friend_movie"."friend_id"
  JOIN "movie"
  ON "friend_movie"."movie_id" = "movie"."movie_table_id"
  WHERE "user"."id" = 1;`;
  pool.query(queryText)
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
  console.log('POST router got a hit');
  const queryText = `INSERT INTO "movie" ("title", "description", "type")
                    VALUES ($1, $2, $3)
                    RETURNING "movie_table_id";`;
  const queryValues = [
    req.body.title,
    req.body.plot,
    req.body.type
  ];
  pool.query(queryText, queryValues)
  .then(result => {
    console.log('New is movie_table_id :', result.rows[0].movie_table_id);
    const createMovieTableId = result.rows[0].movie_table_id

    const insertMovieFriendQuery = `
    INSERT INTO "friend_movie" ("movie_id", "friend_id")
    VALUES ($1, $2);`

    pool.query(insertMovieFriendQuery,[createMovieTableId, req.body.user])
    res.sendStatus(201);
  }).catch(err => {
    console.error('Failed in create media', err);
    res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  console.log('hit router.delete', req.params.id);
  const queryText = `DELETE FROM "friend_movie" WHERE "fm_table_id" =$1;`;
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE queue query', err);
      res.sendStatus(500);
    });
});



module.exports = router;

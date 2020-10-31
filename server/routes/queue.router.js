const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/',rejectUnauthenticated, (req, res) => {
  console.log('Get Queue Router');
  const queryText = `SELECT "user"."id", "movie"."title", "movie"."poster_url", "friend_movie"."status", "friend_movie"."fm_table_id" FROM "user"
  JOIN "friend_movie"
  ON "user"."id" = "friend_movie"."friend_id"
  JOIN "movie"
  ON "friend_movie"."movie_id" = "movie"."movie_table_id"
  WHERE "user"."id" = $1 AND "friend_movie"."status" NOT LIKE 'Watched'
  ORDER BY "friend_movie"."status";`;
  pool.query(queryText, [req.user.id])
  .then((result) => { res.send(result.rows); 
  }).catch((err) => {
  console.error('ERROR IN GET/ queue', err);
  res.sendStatus(500);
  })
});


router.post('/', rejectUnauthenticated, (req, res) => {
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
    console.log('New movie_table_id :', result.rows[0].movie_table_id);
    const createMovieTableId = result.rows[0].movie_table_id

    const insertMovieFriendQuery = `
    INSERT INTO "friend_movie" ("movie_id", "friend_id")
    VALUES ($1, $2);`
// consider using the req.user.id instead of req.body.user
    pool.query(insertMovieFriendQuery,[createMovieTableId, req.user.id])
    res.sendStatus(201);
  }).catch(err => {
    console.error('Failed in create media', err);
    res.sendStatus(500);
  });
});

// kicked off by deleteQueue.saga.js. Next stop in flow is 
// back to the saga then to ManageQueuePage.js
router.delete('/:id',rejectUnauthenticated, (req, res) => {
  console.log('hit router.delete', req.params.id);
  const queryText = `DELETE FROM "friend_movie" WHERE "fm_table_id" =$1;`;
  pool.query(queryText, [req.params.id])
    .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing DELETE queue query', err);
      res.sendStatus(500);
    });
});

router.put('/:id',rejectUnauthenticated, (req, res) => {
  console.log('hit router.put', req.body.idToChange, req.body.statusUpdate)
  const queryText = `UPDATE "friend_movie" SET "status" = $1 WHERE "fm_table_id" = $2;`
  pool.query(queryText, [req.body.statusUpdate, req.body.idToChange])
  .then(() => { res.sendStatus(200); })
    .catch((err) => {
      console.log('Error completing UPDATE query', err);
      res.sendStatus(500);
    });
});


module.exports = router;

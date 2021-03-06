const { default: Axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/:tacos',rejectUnauthenticated,(req, res) => {
  console.log('made it to the router')
  axios({
    method: 'GET',
    url: `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${req.params.tacos}`

  }).then(response => {
    console.log('got back OMBd data', response.data);
    res.send(response.data);
  }).catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  // code here
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // DELETE route code here
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // PUT route code here
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // GET /count route code here
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // GET item route code here
});

module.exports = router;

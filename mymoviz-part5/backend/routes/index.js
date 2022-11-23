var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const API_KEY = 'd24585bf3900cb0543080519e65e9d15'

router.get('/movies', (req, res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => res.json(data))
})

module.exports = router;

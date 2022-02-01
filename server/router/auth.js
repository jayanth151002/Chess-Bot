const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(router);
const pieces = require('../assets/pieces')


router.get('/data', async (req, res) => {
    res.status(200).send("Hi");
})

router.get('/pieces', async (req, res) => {
    res.status(200).send(pieces)
})

module.exports = app;


const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(router);


router.get('/data', async (req, res) => {
    res.status(200).send("Hi");
})

module.exports = app;


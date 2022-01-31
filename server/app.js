const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(cors())
let auth = require('./router/auth');
app.use(auth);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(8000, () => {
    console.log('server is listening')
});
const express = require('express');
require('dotenv').config();
const app = express();
const fs = require('fs');

app.get('/', (req, res) => {
    res.send('welcome to http1');
});

app.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const fileStream = fs.createReadStream(`./images/${filename}`);
    fileStream.pipe(res);
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
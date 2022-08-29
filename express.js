const fs = require('fs');
require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send();
});

app.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const fileStream = fs.createReadStream(`./images/${filename}`);
    fileStream.pipe(res);
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
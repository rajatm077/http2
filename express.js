const fs = require('node:fs');
const http2 = require('node:http2');

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

http2.createServer({
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt')
}, app).listen(8080, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
const fs = require('node:fs');
const https = require('node:https');

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

const options = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
};

https.createServer(options, app).listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});
const express = require('express');
const spdy = require('spdy');
const fs = require('fs');

const app = express();
app.use(express.static('public'));

const options = {
    key: fs.readFileSync('./certs/server.key'),
    cert: fs.readFileSync('./certs/server.crt'),
};

spdy
    .createServer(options, app)
    .listen(3000, (err) => {
        if (err) {
            throw new Error(err);
        }

        console.log('Listening on port: ' + 3000 + '.');
    });

    app.get('/', function (req, res) {
        res.send('Serving using HTTP2!');
      });

      app.get('/:filename', (req, res) => {
        const { filename } = req.params;
        const fileStream = fs.createReadStream(`./images/${filename}`);
        fileStream.pipe(res);
    });
    
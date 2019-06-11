const http = require('http');
const fs = require('fs');
const gpio = require('onoff').Gpio;

onRequest = (req, res) => {
    console.log('New Request: ' + req.url);
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    }
    else if(req.url === '/styles.css') {
        res.writeHead(200, {'Content-Type': 'text/css'});
        fs.createReadStream(__dirname + '/styles.css').pipe(res);
    }
    else if (req.url === '/lamp') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);
        const lamp = {
            on: () => {
                relay.writeSync(1);
                status = 'on';
                console.log('The lamp is now on.');
            },
            off: () => {
                relay.writeSync(0);
                status = 'off';
                console.log('The lamp is now off.');
            },
            status: 'off',
            relay: new gpio(17, 'out'),
        }
        if (lamp.status === 'off') {
            lamp.on();
        }
        else {
            lamp.off();
        }
    }
}

const server = http.createServer(onRequest).listen(8080);

console.log('Server is Running at 127.0.0.1:8080');
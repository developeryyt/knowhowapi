const path = require('path');
const _envPath = path.join(__dirname, '..', `/.env${process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV}` : ''}`);
require('dotenv').config({
    path: _envPath,
});

console.log('process.env.ENV: ', _envPath);
console.log('process.env.ENV: ', process.env.NODE_ENV);


const { createServer } = require('http');
const { Server } = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {})

io.on("connection", (socket) => {

    console.log(socket, 'Socket 통신')
    console.log('socket 연결')

})
httpServer.listen(4000)


const express = require('express');
const moment = require('moment-timezone');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const autoLoadRoutes = require('./middleware/AutoLoadRoutes')


// 전역으로 기본 타임존 설정
moment.tz.setDefault('Asia/Seoul');

const app = express();
const port = process.env.PORT || 8000;


app.set('trust proxy', true);
app.use(cors((req, callback) => {
    const origin = req.header('Origin')

    if(origin) {
        console.log('origin :: ', origin)
        callback(null, { origin: true, credentials: true })
    }else {
        callback(null, { origin: false })
    }

}))

app.get('/favicon.ico', (req, res) => res.status(204))

app.get('/ht', function (req, res) {
    res.status(200).send('ok')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


autoLoadRoutes(path.join(__dirname, 'routes'), app)


const server = app.listen(port, () => {
    try {
        process.send('ready')
    }catch (err) {
        console.log('not pm2 cluster')
    }
    console.log(`Express server listening on port ${port}`)
})


try{
    process.on('SIGINT', function () {
        //추가할 부분

        server.close(function () {
            console.log('server closed')
            process.exit(0)
        })
    })

}catch (e) {

}

const path = require('path');
const _envPath = path.join(__dirname, '..', `/.env${process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV}` : ''}`);
require('dotenv').config({
    path: _envPath,
});

console.log('process.env.ENV: ', _envPath);
console.log('process.env.ENV: ', process.env.NODE_ENV);


const { createServer } = require('http');
const { Server } = require('socket.io')






const express = require('express');

const moment = require('moment-timezone');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const autoLoadRoutes = require('./middleware/AutoLoadRoutes')


// 전역으로 기본 타임존 설정
moment.tz.setDefault('Asia/Seoul');

const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST'],
        credentials: true,
    }
})

io.on("connection", (socket) => {

    console.log('socket 연결')
    console.log(socket, 'Socket 통신')
    console.log(socket.id)

    socket.emit('hello', 'world')

    socket.on('joinRoom', (roomId) => {
        socket.join(roomId)
        console.log(`User joined room: ${roomId}`)
    })

    socket.on('sendMessage', (message, roomId) => {
        io.to(roomId).emit('receiveMessage', message)
        console.log('메세지 내용은', message)
    })

})

httpServer.listen(4000, () => {
    console.log('Listen;;;;;;;')
})


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

const express = require('express');
const cors = require('cors');
const usersDB = require('../model/usersDB');
const movesDB = require('../model/movesDB');
const sessionsDB = require('../model/sessionsDB');
const sessionResultsDB = require('../model/sessionResultsDB');

const app = express();
const http = require('http').Server(app);

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads
app.use(cors({
    origin: "http://localhost:5173"
}))

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const users = []
socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on('roomRequest', e => {
        socket.join(e.roomCode);
        users.push(e.userId);
        socketIO.to(e.roomCode).emit('roomCreation', {roomStatus: 'room created'})
        const population = socketIO.sockets.adapter.rooms.get(e.roomCode).size
        if(population == 2){
            socketIO.to(e.roomCode).emit('roomFull', {
                roomFull: true,
                users: users
            })
        }
    })

    socket.on('status', e => {
        socketIO.to(e.roomCode).emit('status', { 
            board: e.board,
            xTurn: e.xTurn,
            score: e.score,
            gameOver: e.gameOver,
        })
    })

    socket.on('exit', e => {
        if(e.exit){
            socketIO.to(e.roomCode).emit('exit', {exit: true})
        }
    })

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

app.get('/', (req, res) => {
    res.send('Accessible Tic Tac Toe Server')
})

// userDB
app.post('/addUser', (req, res) => {
    usersDB.addUser(req.body, (err, result) => {
        if(err){
            if(err.code === "23505"){
                res.status(409).send("User already exists")
            }else{
                res.status(500).send(err)
            }
        }else{
            res.status(201).send(result)
        }
    })
})

app.post('/verifyUser', (req, res) => {
    usersDB.verifyUser(req.body, (err, result) => {
        if(err){
            if(err.code === 0){
                res.status(500).send('User does not exist')
            } else {
                res.status(500).send(err)
            }
        }else{
            res.status(201).send(result)
        }
    })
})

app.get('/getUser/:userId', (req, res) => {
    usersDB.getUser(req.params.userId, (err, result) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(result)
        }
    })
})

// movesDB
app.post('/addMove', (req, res) => {
    movesDB.addMove(req.body, (err, result) => {
        if(err){
            if(err.code === "23505"){
                res.status(409).send("Move position already exists in this session")
            } else {
                res.status(500).send(err)
            }
        }else{
            res.status(201).send(result)
        }
    })
})

app.get('/getLastMove/:sessionId', (req, res) => {
    movesDB.getLastMove(req.params.sessionId, (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(result)
        }
    })
})

app.get('/getAllMoves/:sessionId', (req, res) => {
    movesDB.getAllMoves(req.params.sessionId, (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(result)
        }
    })
})

app.get('/getAllMovesByUser/:sessionId/:playerId', (req, res) => {
    movesDB.getAllMovesByUser(req.params.sessionId, req.params.playerId, (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(result)
        }
    })
})

// sessionDB
app.post('/addSession', (req, res) => {
    sessionsDB.addSession(req.body, (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(result)
        }
    })
})

app.get('/getSessions/:userId', (req, res) => {
    sessionsDB.getSessions(req.params.userId, (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(result)
        }
    })
})

//session
app.post('/addResults', (req, res) => {
    sessionResultsDB.addResults(req.body, (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(result)
        }
    })
})

app.get('/getResults/:sessionId', (req, res) => {
    sessionResultsDB.getResults(req.params.sessionId, (err, result) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(result)
        }
    })
})

module.exports = http
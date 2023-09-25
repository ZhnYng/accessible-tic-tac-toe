const express = require('express')
const router = express.Router()
const usersDB = require('../model/usersDB');

// userDB
router.post('/addUser', (req, res) => {
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

router.post('/verifyUser', (req, res) => {
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

router.get('/getUser/:userId', (req, res) => {
    usersDB.getUser(req.params.userId, (err, result) => {
        if(err){
            if(err.received === 0){
                res.status(404).send(err)
            } else {
                res.status(500).send(err)
            }
        } else {
            res.status(200).send(result)
        }
    })
})

router.delete('/delete/:username', (req, res) => {
    usersDB.deleteUser(req.params.username, (err, result) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(204).send(result)
        }
    })
})

module.exports = router;
const db = require("./db");

const movesDB = {
    addMove: function(details, callback){
        db.none(
            'INSERT INTO moves(session_id, player_id, move_number, move_position) VALUES($1, $2, $3, $4)',
            [
              details.session_id,
              details.player_id,
              details.move_number,
              details.move_position,
            ]
        )
            .then(() => callback(null, 'Move added'))
            .catch(err => callback(err, null));
    },

    getLastMove: function(sessionId, callback){
        db.any('SELECT * FROM moves WHERE session_id = $1 ORDER BY move_number DESC LIMIT 1;', [sessionId])
            .then(result => callback(null, result))
            .catch(err => callback(err, null));
    },

    getAllMoves: function(sessionId, callback){
        db.any('SELECT * FROM moves WHERE session_id = $1', [sessionId])
            .then(result => callback(null, result))
            .catch(err => callback(err, null));
    },

    getAllMovesByUser: function(sessionId, playerId, callback){
        db.any(
            'SELECT * FROM moves WHERE session_id = $1 AND player_id = $2', 
            [
                sessionId, 
                playerId
            ]
        )
            .then(result => callback(null, result))
            .catch(err => callback(err, null));
    }
}

module.exports = movesDB;
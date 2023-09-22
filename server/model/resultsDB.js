const db = require("./db");

const resultsDB = {
    updateResult: function(details, callback){
        db.none('INSERT INTO results(room_code, player_one, player_one_score, player_two, player_two_score) VALUES($1, $2, $3, $4, $5)', [
            details.roomCode,
            details.playerOne,
            details.playerOneScore,
            details.playerTwo,
            details.playerTwoScore
        ])
            .then(() => callback(null, 'Results updated!'))
            .catch(err => callback(err, null));
    },

    getResult: function(player, callback){
        db.many('\
            WITH LatestResults AS (\
                SELECT\
                    r.*,\
                    ROW_NUMBER() OVER (PARTITION BY room_code ORDER BY results_id DESC) AS rn\
                FROM\
                    results r\
                WHERE\
                    player_one = $1 OR player_two = $1\
            )\
            SELECT *\
            FROM LatestResults\
            WHERE rn = 1;\
        ', [player])
            .then(result => callback(null, result))
            .catch(err => callback(err, null))
    }
}

module.exports = resultsDB;
const db = require("./db");

const sessionResultsDB = {
    addResults: function(details, callback){
        db.none(
            'INSERT INTO session_results(session_id, winner_id) VALUES($1, $2)',
            [details.session_id, details.winner_id]
        )
            .then(() => callback(null, 'Results added'))
            .catch(err => callback(err, null));
    },

    getResults: function(sessionId, callback){
        db.any(
            'SELECT * FROM session_results WHERE session_id = $1',
            [sessionId]
        )
            .then(result => callback(null, result))
            .catch(err => callback(err, null));
    },
}

module.exports = sessionResultsDB;
const db = require("./db");

const sessionsDB = {
    addSession: function(details, callback){
        db.none(
            'INSERT INTO sessions(user1_id, user2_id, session, start_time) VALUES($1, $2, $3, $4)',
            [
                details.user1_id,
                details.user2_id,
                details.session,
                details.start_time,
            ]
        )
            .then(() => callback(null, 'Session added'))
            .catch(err => callback(err, null));
    },

    getSessions: function(userId, callback){
        db.any(
            'SELECT * FROM sessions WHERE user1_id = $1 OR user2_id = $1',
            [userId]
        )
            .then(result => callback(null, result))
            .catch(err => callback(err, null));
    },
}

module.exports = sessionsDB;
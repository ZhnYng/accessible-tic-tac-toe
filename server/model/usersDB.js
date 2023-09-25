const db = require("./db");

const usersDB = {
    addUser: function(details, callback){
        db.none('INSERT INTO users(username, email, password) VALUES($1, $2, $3)', [
            details.username,
            details.email,
            details.password,
        ])
            .then(() => callback(null, 'Account added'))
            .catch(err => callback(err, null));
    },

    verifyUser: function(details, callback){
        db.one('SELECT id, username, email FROM users WHERE username = $1 AND password = $2;', [
            details.username, 
            details.password,
        ])
            .then(result => callback(null, result))
            .catch(err => callback(err, null));
    },

    getUser: function(userId, callback){
        db.one('SELECT username FROM users WHERE id = $1;', [userId])
            .then(result => callback(null, result))
            .catch(err => callback(err, null));
    },

    deleteUser: function(username, callback){
        db.none('DELETE FROM users WHERE username = $1;', [username])
            .then(() => callback(null, 'User deleted'))
            .catch(err => callback(err, null))
    }
}

module.exports = usersDB;
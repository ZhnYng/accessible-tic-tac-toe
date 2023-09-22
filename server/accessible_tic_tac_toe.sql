DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE sessions (
    session_id serial PRIMARY KEY,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    session VARCHAR(50),
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id)
);

CREATE TABLE moves (
    move_id serial PRIMARY KEY,
    session_id INT NOT NULL,
    player_id INT NOT NULL,
    move_number INT NOT NULL,
    move_position INT NOT NULL,
    move_timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id),
    FOREIGN KEY (player_id) REFERENCES users(id),
    UNIQUE (session_id, move_position)
);

CREATE TABLE session_results (
    result_id serial PRIMARY KEY,
    session_id INT NOT NULL,
    winner_id INT,
    FOREIGN KEY (session_id) REFERENCES sessions(session_id),
    FOREIGN KEY (winner_id) REFERENCES users(id)
);

CREATE TABLE results (
    results_id SERIAL PRIMARY KEY,
    room_code VARCHAR(50),
    player_one INT NOT NULL,
    player_one_score INT NOT NULL,
    player_two INT NOT NULL,
    player_two_score INT NOT NULL,
    FOREIGN KEY (player_one) REFERENCES users(id),
    FOREIGN KEY (player_two) REFERENCES users(id)
);
# Accessible-tic-tac-toe

### Assumptions
1. Users understand the rules of tic-tac-toe
2. The game follows the traditional rules i.e. 2 players per game
3. Requires low latency between 2 players in the same room

### To visit this web app
Go to: https://accessible-tic-tac-toe-zy.netlify.app/
### How to run locally
1. Clone this repo locally
2. cd into frontend and run npm i
3. Then run npm run dev to start the frontend
4. To run backend locally, you have to start your own local postgres db
5. The schema for the db is given in this repo (accessible_tic_tac_toe.sql)
6. Go into server -> model -> db.js and add your local db connection url into const db = pgp(neon_db_key);
7. cd into server, run npm i, then npm start

### Design Decisions

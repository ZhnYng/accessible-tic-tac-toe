# Accessible-tic-tac-toe
Video demo: https://youtu.be/cdkKHxLGphs

### Assumptions
1. Users understand the rules of tic-tac-toe
2. The game follows the traditional rules i.e. 2 players per game
3. Requires low latency between 2 players in the same room

### To visit this web app (may not work)
**The backend web service may take more than a minute to spin up**

Go to: https://accessible-tic-tac-toe-zy.netlify.app/

### How to run locally
1. Clone this repo locally
2. cd into frontend and run npm i
3. Enter main.jsx and change to axios.defaults.baseURL = 'http://localhost:5000';
4. Then run npm run dev to start the frontend
5. To run backend locally, you have to start your own local postgres db
6. The schema for the db is given in this repo (accessible_tic_tac_toe.sql)
7. Go into server -> model -> db.js and add your local db connection url into const db = pgp(neon_db_key);
8. Enter app.js and change to origin: "http://localhost:5173"
9. cd into server, run npm i, then npm start

### Design Decisions
1. #### Colour and Contrast
   - To aid the visually impaired (e.g. colour-blindness)
   - Having enough contrast allows these users to be able to discern different sections of the website/webapp
   - We can check if the contrast ratio is enough with https://webaim.org/resources/contrastchecker/
   - ![image](https://github.com/ZhnYng/accessible-tic-tac-toe/assets/72967431/fd18d833-3f4c-45b8-aaa6-ad9e4939c65f)
2. #### Keyboard Accessibility
   - To aid the motor impaired users, I have chosen to use buttons for most parts of the game because buttons allow users to "focus" on them with a tab.
   - This is useful for the motor impaired because they only need to use buttons to navigate the whole webpage
   - And when they press enter, they can place either an X or O easily
3. #### More Screen Reader Support
   - As mentioned earlier, the buttons allow users to "focus" on them.
   - What I have done is to have a message for each of the boxes when they are in focus.
   - For example it could say "Add X to the top right" when focused on the top right box on the board
   - This allows the screen reader to read that text and the user can hear it
   - Besides this, users need to understand what is happening on the board
   - Thus I added an announce feature. At the click of this button, it will send a message to be displayed at the bottom left of the webpage, talking about the positions of each X and O.
   - This is done with the help of live regions, where parts of a page are continuously announced by the screen reader.
   - To do this, we need to we need to assign a role="region" attribute to a <div> tag, as well as an aria-live attribute
   - I chose aria-live to be assertive because we want the screen reader to interrupt any ongoing screen reading to announce the status of the board
  
### APIs
1. POST '/addUser' to add a new user at the sign in page
2. POST '/verifyUser' to verify the details of a user in the login page
3. GET '/getUser' to get the username by userId
4. POST '/addMove' to add a move made by a player
5. GET '/getLastMove/:sessionId' to get the last move made in the session/game
6. GET '/getAllMoves/:sessionId' to get all the moves in a session
7. GET '/getAllMovesByUser/:sessionId/:playerId' to get all the moves made by a user in a session
8. POST '/addSession' to add a session to the DB whenever a game is created
9. GET '/getSessions/:userId' to get all the sessions the user has played in
10. POST '/addResults' to add the results of each session whenever there is a winner
11. GET '/getResults/:sessionId' to get the result of the session

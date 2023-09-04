const http = require('./control/app');

// Backend running at localhost:5000
http.listen(5000, (err) => {
    if(err) throw err;
    console.log("Server running on port 5000");
})
// import your node modules

// add your server code starting here
// https://github.com/JamieHall1962/Node-Express-Lab/pull/1



const server = require('./data/server.js');  


const port = 4000;
server.listen(port, () =>
  console.log(`\n=== Server listening on Port: ${port} ===\n`)
);

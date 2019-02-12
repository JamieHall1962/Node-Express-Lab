// import your node modules
https://api.mysportsfeeds.com/v2.0/pull/mlb/2018-regular/games/20180514-OAK-BOS/playbyplay.json -u{a9e283b4-6f81-46f7-b2e8-6bd635}:MYSPORTSFEEDS

// add your server code starting here


const express = require("express");

const db = require("./data/db.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

server.get("/api/users/:id", (req, res) => {
  userId = req.params.id;
  db.findById(userId)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  userId = req.params.id;
  db.remove(userId)
    .then(deleted => {
      if (deleted) {
        db.find()
          .then(users => res.status(200).json(users))
          .catch(() => res.status(500).json({ error: "Server Error" }));
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

server.post("/api/users", (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      db.insert(user)
        .then(() => {
          db.find().then(users => res.status(201).json(users));
        })
        .catch(() =>
          res.status(500).json({
            error: "There was an error while saving the user to the database"
          })
        );
    }
  });
  
  server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ errorMessage: "Please provide name and bio for the user." });
    } else {
      db.update(id, changes)
        .then(user => {
          if (user) {
            db.find()
              .then(users => res.status(200).json(users))
              .catch(() => res.status(500).json({ error: "Server Error" }));
          } else {
            res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
          }
        })
        .catch(() =>
          res
            .status(500)
            .json({ error: "The user information could not be modified." })
        );
    }
  });
  
  


const port = 8000;
server.listen(port, () =>
  console.log(`\n=== Server listening on Port: ${port} ===\n`)
);

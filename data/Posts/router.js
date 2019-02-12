const express = require('express');

const Posts = require('../../data/db');

const router = express.Router();


router.post("/", (req, res) => {
 
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.insert({ title:req.body.title, contents:req.body.contents })
      .then(posts => {
        res.status(201).json(posts);
      })
      .catch((err) => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

router.get("/", (req, res) => {
    Posts.find()
      .then(posts => {
        res.json(posts);
      })
      .catch((err) => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  });
  

router.get("/:id", (req, res) => {
  const  id  = req.params.id;

  Posts.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Posts.findById(id)
    .then(post => {
      if (post.length > 0) {
        Posts.remove(id)
          .then(() => {
            res.json(post);
          })
       
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  const  id  = req.params.id;
  
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    Posts.findById(id)
      .then(post => {
        if (post.length > 0) {
          Posts.update(id, { title:req.body.title, contents: req.body.contents }).then(post => {
            if (post === 1) {
              Posts.findById(id).then(post => {
                res.json(post);
              });
            } else {
              res.status(404).json({ message: "The Post could Not be Updated." });
            }
          });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist."
          });
        }
      })

      .catch((err) => {
        res
          .status(500)
          .json({ error: "The post information could not be modified." });
      });
  }
});
module.exports = router;
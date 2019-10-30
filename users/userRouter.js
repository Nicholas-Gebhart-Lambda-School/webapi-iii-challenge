const router = require("express").Router();
const userdb = require("./userDb");
const postsdb = require("../posts/postDb");

router.post("/", validateUser, (req, res) => {
  const { name } = req.body;
  userdb.insert({ name }).then(user => res.status(200).json(user));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const blogPost = {
    text: req.body.text,
    user_id: req.user.id
  };
  postsdb.insert(blogPost).then(post => res.status(200).json(post));
});

router.get("/", (req, res) => {
  userdb
    .get()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({ errorMessage: "You have goofed" }));
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.user;
  userdb
    .getById(id)
    .then(user => res.status(200).json(user))
    .catch(() => res.status(500).json({ error: "you msessed up" }));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.user;

  userdb
    .getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => res.status(500).json({ err: "server suck" }));
});

router.delete("/:id", validateUserId, (req, res) => {
  const { id } = req.user;
  userdb
    .remove(id)
    .then(post =>
      res.status(200).json({ response: `Deleted post id #${post}` })
    )
    .catch(() => res.status(500).json({ error: "server error" }));
});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  userdb.update(id, { name }).then(user =>
    res
      .status(200)
      .json(user)
      .catch(err => res.status(500).json({ err: err }))
  );
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  userdb
    .getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: "user does not exist" });
      }
    })
    .catch(() => res.status(400).json({ message: "invalid user id" }));
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;

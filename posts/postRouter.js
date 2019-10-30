const router = require("express").Router();
const db = require("./postDb");

const { get, getById, getUserPosts, insert, update, remove } = db;

router.get("/", (req, res) => {
  get().then(posts => res.status(200).json(posts));
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.post;
  getById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => res.status(500).json({ err: err }));
});

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.post;
  remove(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ err: err }));
});

router.put("/:id", validatePostId, (req, res) => {
  const { id } = req.post;
  const { text } = req.body;
  update(id, { text })
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json({ err: err }));
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "post does not exist" });
      }
    })
    .catch(() => res.status(400).json({ message: "invalid post id" }));
}

module.exports = router;

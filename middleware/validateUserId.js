function validateUserId(res, req, next) {
  const { id } = req.params;
  id
    ? (req.user = req.body)
    : res.status(400).json({ message: "invalid user id" });
  next();
}

const router = require("express").Router();
const authenticatedRoute = require("./verifyToken");

router.get("/", authenticatedRoute, (req, res) => {
  res.send(req.user);
});

module.exports = router;

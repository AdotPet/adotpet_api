const router = require("express").Router();
const authenticatedRoute = require("./verifyToken");
const User = require("../model/User");

router.get("/", authenticatedRoute, async (req, res) => {
  const users = await User.find().select("-password");

  res.send(users);
});

module.exports = router;

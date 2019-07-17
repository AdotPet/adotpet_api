const router = require("express").Router();
const authenticatedRoute = require("./verifyToken");
const User = require("../model/User");

router.get("/current", authenticatedRoute, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

module.exports = router;

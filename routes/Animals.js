const router = require("express").Router();
const authenticatedRoute = require("./verifyToken");
const Animal = require("../model/Animal");

router.get("/", authenticatedRoute, async (req, res) => {
  const animals = await Animal.find();

  res.send(animals);
});

module.exports = router;

const router = require("express").Router();
const authenticatedRoute = require("./verifyToken");
const Animal = require("../model/Animal");

router.get("/", async (req, res) => {
  const animals = await Animal.find({ animal_id: req.user });
  res.send(animals);
});

router.post("/create", authenticatedRoute, async (req, res) => {
  // Create a new animal
  const animal = new Animal({
    name: req.body.name,
    species: req.body.species,
    genere: req.body.genere,
    month: req.body.month,
    status: req.body.status,
    cep: req.body.cep,
    state: req.body.state,
    city: req.body.city,
    address: req.body.address,
    description: req.body.description,
    feature: req.body.feature,
    observation: req.body.observation
  });

  try {
    const savedAnimal = await animal.save();
    res.send({ animal: animal._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

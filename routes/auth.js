const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
  ongValidation
} = require("../validate");
const authenticatedRoute = require("./verifyToken");

router.post("/register", async (req, res) => {
  // Verify type user 0 = admin / 1 = user / 2 = Ong
  const { dataUser, entity } = req.body;

  switch (dataUser.role) {
    case 1:
      break;
    case 2:
      const { error } = ongValidation(entity);
      if (error) return res.status(400).send(error.details[0].message);
      break;
    default:
      break;
  }

  // Validate the data before submit a user
  const { error } = registerValidation(dataUser);

  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: dataUser.email });
  if (emailExist) return res.status(400).send("Este e-mail já existe.");

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(dataUser.password, salt);

  // Create a new user
  const user = new User({
    name: dataUser.name,
    email: dataUser.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  // Validate login before
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("E-mail não encontrado.");
  // Checking if password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Senha inválida.");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token);

  res.send("Login successfuly...");
});

router.get("/users", authenticatedRoute,  async (req, res) => {
  const users = await User.find().select("-password");

  res.send(users);
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
	return jwt.sign(params, process.env.JWT_SECRET, {
		expiresIn: 86400 // One day expires
	});
}

router.post('/register', async (req, res) => {
	const { email } = req.body;
	let user = null;

	try {
		user = await User.findOne({ email });

		if (user) {
			return res.status(400).send({ error: 'User already exists.' });
		}

		user = await User.create(req.body);

		// remove password in output user json
		user.password = undefined;

		return res.send({ user, token: generateToken({ id: user.id }) });
	} catch (err) {
		return res.status(400).send({ error: 'Registration Failed.' });
	}
});

router.post('/authenticate', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email }).select('+password');

	if (!user) return res.status(400).send({ error: 'User not found.' });

	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) return res.status(400).send({ error: 'Invalid password.' });

	user.password = undefined;

	res.send({ user, token: generateToken({ id: user.id }) });
});

module.exports = (app) => app.use('/auth', router);

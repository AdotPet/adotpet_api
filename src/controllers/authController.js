const express = require('express');

const User = require('../models/user');

const router = express.Router();

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

		return res.send({ user });
	} catch (err) {
		return res.status(400).send({ error: 'Registration Failed.' });
	}
});

module.exports = (app) => app.use('/auth', router);

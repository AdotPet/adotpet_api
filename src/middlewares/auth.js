const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) return res.status(401).send({ error: 'No token provided.' });

	const parts = authHeader.split(' ');

	if (!parts.length === 2) return res.status(401).send({ error: 'Token not recognized.' });

	const [ scheme, token ] = parts;

	if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token bad formatted.' });

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.status(401).send({ error: 'Token invalid.' });

		//req.userId = decoded.id;
		req.user = decoded;

		return next();
	});
};
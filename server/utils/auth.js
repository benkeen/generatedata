const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();


const saltRounds = 10;
const getPasswordHash = async (plainTextPassword) => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(plainTextPassword, salt);
};

const isValidPassword = async (plainTextPassword, hash) => await bcrypt.compare(plainTextPassword, hash);

const getJwt = (payload) => jwt.sign(payload, process.env.GD_JWT_SECRET, { expiresIn: '7d' });

const authenticate = ({ req }, requireAuth = true) => {
	const header =  req.headers.authorization;

	if (header) {
		const token = header.replace('Bearer ', '');
		return jwt.verify(token, process.env.GD_JWT_SECRET);
	}

	if (requireAuth) {
		throw new Error('Login in to access resource');
	}

	return null;
};


module.exports = {
	getPasswordHash,
	isValidPassword,
	getJwt,
	authenticate
};

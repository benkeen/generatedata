const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

const saltRounds = 10;
const getPasswordHash = async (plainTextPassword) => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(plainTextPassword, salt);
};

const isValidPassword = async (plainTextPassword, hash) => await bcrypt.compare(plainTextPassword, hash);

const getJwt = (payload) => jwt.sign(payload, process.env.GD_JWT_SECRET, {
	expiresIn: `${process.env.GD_JWT_LIFESPAN_MINS}m`
});

const authenticate = async (token) => {
	if (token) {
		try {
			await jwt.verify(token, process.env.GD_JWT_SECRET);
			return true;
		} catch (e) {
			return false;
		}
	}

	return false;
};

const decodeToken = (token) => {
	const decodedToken = jwt.decode(token, { complete: true });

	if (!decodedToken) {
		throw new Error();
	}

	return decodedToken;
};

const getUser = (token) => {
	if (!token) {
		return {};
	}
	const decodedToken = decodeToken(token);
	return decodedToken.payload;
};

module.exports = {
	getPasswordHash,
	isValidPassword,
	getJwt,
	authenticate,
	getUser
};

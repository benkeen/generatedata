const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();


const saltRounds = 10;
const getPasswordHash = async (plainTextPassword) => {
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(plainTextPassword, salt);
};

const isValidPassword = async (plainTextPassword, hash) => await bcrypt.compare(plainTextPassword, hash);

const getJwt = (payload) => jwt.sign(payload, process.env.GD_JWT_SECRET);


module.exports = {
	getPasswordHash,
	isValidPassword,
	getJwt
};

const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

const signJwt = (data) => {
    try {
        return jwt.sign(data, JWT_SECRET, { expiresIn: '1d' });
    }
    catch (error) {
        throw error;
    }
}

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw error;
    }
}

module.exports = { signJwt, verifyJwt };
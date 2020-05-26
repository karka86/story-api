const jwt = require('jsonwebtoken');
const privateKey = require('./constants').auth.privateKey;

const token = (payload :string) => {
    return jwt.sign(payload, privateKey);
};

const decode = (token : string) => {
    return jwt.verify(token, privateKey);
};

module.exports = {token, decode};
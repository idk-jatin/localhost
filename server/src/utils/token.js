const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

// JWT signed Access Token 
exports.signAccessToken = (userId) =>{
    return jwt.sign({sub:userId},process.env.JWT_ACCESS,{expiresIn:'15m'});
};
// JWT signed Refresh Token 
exports.signRefreshToken = (userId) =>{
    return jwt.sign({sub:userId},process.env.JWT_REFRESH,{expiresIn:'30d'});
};
// Verifies Refresh token that is it a JWT signed by our server or not
exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH);
};
// Hashes token for storing in DB
exports.hashToken = async (token) => {
  return argon2.hash(token);
};
// It verifies the token from cookie and in DB are same
exports.verifyTokenHash = async (hash, token) => {
  return argon2.verify(hash, token);
};

/**
 * Middleware extracts user id and store it in "user" header.
 * Sets it to "token". 
 */
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const utils = require("../utils/config");

 const getToken = async (request, response, next) => {
    try {
        
        const decodedToken = jwt.verify(request.headers.token, utils.SECRET); 
        const user = await User.findById(decodedToken.id);
        request.headers["user"] = user; 
    
    } catch (error) {
        console.log(error.message);
    }finally{
        next();
    } 
}

module.exports = getToken;
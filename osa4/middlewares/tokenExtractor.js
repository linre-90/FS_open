/**
 * Middleware extracts user auth header from request.
 * Sets it to "token". 
 */
const getToken = (request, response, next) => {
    const authorization = request.get("authorization");
    if(authorization && authorization.toLowerCase().startsWith("bearer")){
                request.headers["token"] = authorization.substring(7); 
    }    
    
    next();
}

module.exports = getToken;
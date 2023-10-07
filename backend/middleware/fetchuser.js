const jwt = require("jsonwebtoken");
const JWT_SEC = "zxcgvbnm";

const fetchuser = (req, res, next) =>{
    //fetching the authtoken from the req header
    const token = req.header("auth-token");
    //checks wheather the token is valid or not
    if(!token){
        res.status(401).send({error: "Please authenticate using valid token"})
    }
    try {
        // comparing and verifying the token and the JWT_SEC
        const data = jwt.verify(token, JWT_SEC);
        //assigning the data of user to req.user
        req.user = data.user;
        // calling the next function after using a middleware i.e async (req, res) function inside the 3rd route
        next();    
    } catch (error) {
        res.status(401).send({error: "Please authenticate using valid token"})
    }
   
}


module.exports = fetchuser;
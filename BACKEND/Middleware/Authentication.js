const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {

        const authtoken = req.headers['authorization'];
        const token=authtoken && authtoken.split(' ')[1];
        if(token)
        {
            const secretKey = process.env.USER_SECRET_KEY;
            jwt.verify(token,secretKey,(err,user)=>{
                if(err)
                {
                    res.json("Unauthorized");
                }
                else{
                    next();
                }
            })
        }
        else{
            res.json("Token not found")
        }
        // if (authtoken) {

        //     const token = authtoken.split(' ')[1];
        //     const valid = jwt.verify(token, 'your_secret_key');
        //     return next();
        // } else {
        //     throw new Error('Token not provided');
        // }
   
}

module.exports = verifyToken;

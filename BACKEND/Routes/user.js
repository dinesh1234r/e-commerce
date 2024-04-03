const express = require('express')
const router = express.Router()
const userSchema = require('../model/users');
const bcrypt = require('bcrypt');
const { validationResult, check } = require('express-validator');
const jwt=require('jsonwebtoken')
const authentication=require('../Middleware/Authentication')
require('dotenv').config();

router.post('/register',[check('password').isLength({min:6})], async (req, res) => {
    try{
    const error=validationResult(req);
    if(!error.isEmpty())
    {
        res.json("Password must contain atleast 6 character")
    }
    else
    {
    const checking=await userSchema.find({username:req.body.username})

    if(checking.length==0)
    {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
    

         const newUser = new userSchema({
            username: req.body.username,
            password: hashedPassword,
            money:50000
        })
        newUser.save()
        res.json("Registered Successfully");
    }
    else{
        res.json("User already existes");
    }
    }
}catch(error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
}
    
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userSchema.findOne({ username });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.json('Invalid username or password');
            } else {
                const secretKey = process.env.USER_SECRET_KEY;
                const token = jwt.sign({ username: user.username }, secretKey);
                const result={
                    customerId:user._id,
                    jwt:token,
                    message:"Login Successful"
                }
                return res.json(result)
            }
        } else {
            return res.json("User doesn't exist");
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/availablemoney/:userID', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.userID);
        if (!user) {
            return res.json("Not a valid user");
        }
        res.json({ money: user.money });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});





module.exports = router

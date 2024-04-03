const express=require('express')
const router=express.Router()
const productSchema=require('../model/products')
const userSchema=require('../model/users')
const verifyToken=require('../Middleware/Authentication')
const { ConnectionStates } = require('mongoose')

router.get('/',verifyToken,async(req,res)=>{
    try{
        const products=await productSchema.find()
        res.json(products)
    }
    catch(err)
    {
        res.json(err)
    }
})

router.post('/checkout', async (req, res) => {
    try {
        const { customerId, cartItems } = req.body;
        const user = await userSchema.findById(customerId);
        
        if (!user) {
            return res.json("User does not exist");
        }
        
        const productIds = Object.keys(cartItems);
        const products = await productSchema.find({ _id: { $in: productIds } });
        
        if (productIds.length !== products.length) {
            return res.json("Products and ids do not match");
        }
        
        let total = 0;

        for (const itemId in cartItems) {
            const product = products.find(p => String(p._id) === itemId);
            if (!product) {
                continue;
            }
            if (product.stockQuantity < cartItems[itemId]) {
                continue;
            }
            total += product.price * cartItems[itemId];
        }

        if (total > user.money) {
            return res.json("Insufficient money");
        }
        
        user.money -= total;
        user.purchasedItems.push(...productIds);
        await user.save();

        await productSchema.updateMany({ _id: { $in: productIds } }, { $inc: { stockQuantity: -1 } });

        res.json("Checkout successful");
    } catch (err) {
        console.error(err);
        res.status(500).json("Error in checkout process");
    }
});


router.get('/purchaseditems/:userID', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.userID);
        if (!user) {
            return res.json("Not a valid user");
        }
        const products=await productSchema.find({_id:{$in:user.purchasedItems}})
        res.json({purchasedItems:products });
    } catch (err) {
        console.error(err);
        res.json("Error");
    }
});

module.exports=router
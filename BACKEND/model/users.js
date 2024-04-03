const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    money:Number,
    purchasedItems: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
        default: [] 
    }
})

module.exports=mongoose.model('User',UserSchema)
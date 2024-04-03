const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:String,
    price:Number,
    description:String,
    imageURL:String,
    stockQuantity:Number
})

module.exports=mongoose.model('Products',productSchema)
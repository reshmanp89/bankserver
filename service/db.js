const { default: mongoose } = require("mongoose")
const mangoose=require("mongoose")
//connection string creation

mongoose.connect("mongodb://localhost:27017/bankServer",{useNewUrlParser:true})

//model creation

const User=mangoose.model("User",
{ 
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transactions:[]
})
module.exports={
    User
}
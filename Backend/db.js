const mongoose=require("mongoose")

const mongooseUrl="mongodb://localhost:27017/ecommerce"

mongoose.connect(mongooseUrl);

const db=mongoose.connection;

db.on("connected",()=>{
    console.log("connected to the mongodb server")
})

db.on("error",(err)=>{
    console.log("Mongo db connection error:',err")
})

db.on("connected",()=>{
    console.log("connected to the mongodb server")
})

db.on("disconnected",()=>{
    console.log("Mongo db Disconnected")
})

module.exports=db
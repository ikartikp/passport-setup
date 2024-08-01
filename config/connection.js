const mongoose =require("mongoose")
exports.connectionDB=()=>{
try {
    mongoose.connect(process.env.MONGO)
console.log("Connection succesfull");
} catch (error) {
   console.log(error.message); 
}
}

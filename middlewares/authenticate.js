const passport=require("passport")
const isloogedin=(req,res,next)=>{
    if(req.isAuthenticated){
    return next()
    }
}

module.exports=isloogedin
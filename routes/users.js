var express = require("express");
var router = express.Router();
const userModel=require("../models/userModel");
const passport = require("passport");
const localStrategy=require("passport-local")
const isloggedin=require("../middlewares/authenticate")


passport.use(new localStrategy(userModel.authenticate()))

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET profile page. */
router.get("/profile", isloggedin, function (req, res, next) {
  res.render("profile", { title: "profile" });
});

/* POST users signup listing. */
router.post("/signup", (req, res, next) => {
 try {
  const { username, password, email } = req.body;
  const changableData = { username, email };
  const encryptedData =  password ;
  userModel.register(changableData,encryptedData).then(()=>{
    passport.authenticate("local")(req,res,()=>{
      res.redirect("/users/profile")
      })
  }).catch(()=>{
console.log(error);
  })
 
 } catch (error) {
  console.log(error);
  res.send(error.message)
 }
});

router.get("/logout",(req,res,next)=>
{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

/* POST users login listening . */

router.post("/login",passport.authenticate("local",{
  successRedirect:"/users/profile",
  failureRedirect:"/login"
}),(req,res,next)=>{} )


module.exports = router;

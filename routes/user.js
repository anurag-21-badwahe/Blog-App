const { Router } = require("express");
const {handleSignupRoute,handleSigninRoute} = require("../controller/user")


const router = Router();

router.post("/signin",handleSigninRoute);

router.post("/signup",handleSignupRoute);


module.exports = router;

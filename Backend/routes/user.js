const express = require("express");
const router = express.Router();


const { getUserById, getUser,getAllUsers,updateUser,userPurchaseList, userAddPrediction, usergetPrediction } = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");

router.param("userId",getUserById);

router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)
router.get("/orders/user/:userId",isSignedIn,isAuthenticated,isAdmin,userPurchaseList)
router.get("/users",getAllUsers);
router.put("/users/addPrediction/:userId",userAddPrediction)
router.get("/users/getPrediction/:userId",usergetPrediction);



module.exports = router;
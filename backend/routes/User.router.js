const express = require("express");
const router = express.Router();
const {signup,signin,signout, getUser, getAllUser, updateUser, deleteUser, validateToken} = require("../controller/User.controller")
// router.get("/get",(req,res) => {
//     res.send("hey");
// });

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/signout", signout)
router.post("/getuser",validateToken, getUser)
router.get("/getAlluser", getAllUser)
router.put("/updateuser", validateToken, updateUser);
router.delete("/deleteuser", validateToken, deleteUser);

module.exports = router;
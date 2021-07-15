const express = require("express");
const router = express.Router();
const{ createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, uploadImage } = require("../controller/Product.controller");
const { validateToken } = require("../controller/User.controller");

router.post("/createproduct",validateToken, createProduct);
router.post("/getproduct",validateToken, getProduct);
router.get("/getallproduct",getAllProduct);
router.put("/updateproduct",validateToken, updateProduct);
router.delete("/deleteproduct",validateToken, deleteProduct);
router.post("/image",uploadImage);

module.exports = router;
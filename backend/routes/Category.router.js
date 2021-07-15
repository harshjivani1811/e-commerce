const express = require("express");
const router = express.Router();
const { createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require("../controller/Category.controller");
const { validateToken } = require("../controller/User.controller");
const Category = require("../models/Category");

router.post("/createcategory",validateToken,createCategory);
router.post("/getcategory",validateToken,getCategory);
router.get("/getallcategory",getAllCategory);
router.put("/updatecategory",validateToken,updateCategory);
router.delete("/deletecategory",validateToken,deleteCategory);

module.exports = router;
const mongoose = require("mongoose");

const CategoryModel = new mongoose.Schema (
    {
        name : {
            type : String,
            require : true,
            maxlength : 50,
            trim : true
        },
    },
    { timestamps : true},
);

module.exports = mongoose.model("category",CategoryModel);
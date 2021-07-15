const mongoose = require("mongoose");
const { object_Id } = mongoose.Schema;

const ProductInCartModel = new mongoose.Schema(
    {
        product : {
            type : object_Id,
            ref : "product"
        },
        name : String,
        count : Number,
        price : Number
    },
);

const OrderModel = new mongoose.Schema(
    {
        name : String,
        transction_Id : {},
        amount : Number,
        address : String,
        status : {
            type : String,
            default : "recieved",
            enum : ["cancelled","delivered","shipped","received"]
        },
        update : Date,
        user : {
            type : object_Id,
            ref : "user"
        },
    },
    { timestamps : true }
);

const ProductInCart = mongoose.model ("products",ProductInCartModel);
const order = mongoose.model ("product",OrderModel);

module.exports = {ProductInCart, order}


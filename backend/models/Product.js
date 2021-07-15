// const mongoose = require("mongoose");
// const {Object_Id} = mongoose.Schema;

// const productModel = new mongoose.Schema(
//     {
//         name : {
//             type : String,
//             required : true,
//             maxlength : 50,
//             trim : true
//         },
//         description : {
//             type : String,
//             required : true,
//             maxlength : 2000,
//             trim : true
//         },
//         price : {
//             type : Number,
//             required : true
//         },
//         category : {
//             type : Object_Id,
//             ref : "category",
//             required : true
//         },
//         stock : {
//             type : Number
//         },
//         sold : {
//             type : Number,
//             default : 0
//         },
//         photo : {
//             data : Buffer,
//             contentType : String
//         },   
//     },   
//     { timestamps : true}
// );

// module.exports = mongoose.model("Product",productModel);


const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productModel = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productModel);
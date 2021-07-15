const mongoose = require("mongoose");
const crypto = require("crypto");
const {v4 : uuidv4} =  require("uuid");

const UserModel = new mongoose.Schema(
    {
        firstname : {
            type : String,
            required : true,
            maxlength : 32,
            trim : true
        },
        lastname : {
            type : String,
            required : true,
            maxlength : 32,
            trim : true
        },
        email : {
            type : String,
            required : true,
            trim : true
        },
        encrypt_password : {
            type : String,
            required : true
        },
        salt : String,
        role : {
            type : Number,
            default : 0
        },
        product : {
            type : Array,
            default : []
        },
    },
    { timestamps : true }
);


UserModel.virtual("password")
  .set(function (password){
      this._password = password;
      this.salt = uuidv4();
      this.encrypt_password = this.securePassword(password);
  })
   .get(function(){
       return this._password;
   }),

UserModel.methods = {
      authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encrypt_password;
      },
      securePassword : function(password) {
          if(!password)
          return "";
          try {
              return crypto
              .createHmac("sha256",this.salt)
              .update(password)
              .digest("hex")
          } catch (error) {
              console.log(error);
              return "";
          }
     }
}

module.exports = mongoose.model("User", UserModel);
var mongoose = require("mongoose");
var validator = require('validator')

//**********************************************************************************************************//
var Schema = mongoose.Schema;

var users = new Schema({
	authorization:String,
	deviceToken:String,
	fingerPrint:String,
  	name:String,
});

// Register ...
mongoose.model("users",users);

let UsersModel = {}
UsersModel.model = mongoose.model("users");


UsersModel.findUser = (authorization, deviceToken, fingerPrint ,callbackFn)=>{
    UsersModel.model.findOne({authorization:authorization, deviceToken:deviceToken
            , fingerPrint:fingerPrint},(err,doc)=>{
        callbackFn(err, doc);
      });
}

//*********************** validating data*************************//
UsersModel.isValidData=(data)=>{

  let response={case:true,error:""}
  console.log(data)
  if(!validator.isEmail(data.email))
  {
    response={case:false,error:response.error+"email isn't valid, "}
  }
  if(!validator.isAlpha(data.firstname))
  {
    response={case:false,error:response.error+"first isn't valid , "}
  }
  if(!validator.isAlpha(data.lastname))
  {
    response={case:false,error:response.error+"last isn't valid "}
  }

 return response
}

module.exports = UsersModel;

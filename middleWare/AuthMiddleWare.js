var UsersModel = require("../models/users")

var authorizedMid = (request,response,next)=>{
  if(request.body){
      UsersModel.findUser(request.body.authorization, request.body.deviceToken
          , request.body.fingerPrint,function(err,data){
              if(!err){
                  if(data == null)
                  {
                      response.json("The user is unauthorized")
                  }
                  else{
                      request.userId = data._id
                      next();
                  }
              }
              else{
                  response.json("An error occure while fetching user error"+err)
              }

      });
  }
  else {
      response.json("body is empty")
  }
}

module.exports=authorizedMid

var express = require("express")
var bodyParser = require("body-parser")
var router = express.Router()
var mongoose = require("mongoose")
var ContactsModel = require("../models/contacts")
var UsersModel = require("../models/users")
var requestCheckerAuth  =  require('../middleWare/AuthMiddleWare.js')


//************************************** Add new Contact *****************************//


router.post("/addContact",bodyParser.json(),requestCheckerAuth,function(request,response)
{
    let checkValid=UsersModel.isValidData(request.body)
    if(checkValid.case)
    {
        ContactsModel.addContact({
            userId:request.userId,
            firstname:request.body.firstname,
            lastname:request.body.lastname,
            email:request.body.email,
            mobile:request.body.mobile,

        },function(err,doc){
        if(!err)
        {
          let msg = {
              statusCode: response.statusCode,
              message: "new contact is added successfully",
              data: doc
            }
            response.json(msg);
        }
        else
            response.json("An error occure while saving contact in database error is "+ err);
        });
    }
    else{
            response.json(checkValid);
    }
});

//******************************************* get contact list **************************************//
router.post("/getList",bodyParser.json(),requestCheckerAuth,function(request,response)
{
        ContactsModel.getContactList(request.userId,request.body.pageNum,
            function(err,contactsList){
                let msg = {
                    statusCode: response.statusCode,
                    message: 'Get Contact List opertation done successfully',
                    data: contactsList,
                }
                response.json(msg);
        });
});

////*************************************** get Recent contacts*************************************//
router.post("/getRecentList",bodyParser.json(),requestCheckerAuth,function(request,response)
{
        ContactsModel.getRecentContacts(request.userId, function(err,data){
                let msg = {
                    statusCode: response.statusCode,
                    message: 'Get Recent Contacts opertation done successfully',
                    data: data,
                }
                response.json(msg);
        });
});

module.exports = router;

var mongoose = require("mongoose");
var mongoosePaginate= require("mongoose-paginate");

//******** Building Schema*******
var Schema = mongoose.Schema;

var contacts = new Schema({

  firstname:{
    type:String
  },
  lastname:{
    type:String
  },
  email:{
    type:String
  },
  mobile:{
    type:String
  },
  time : {
    type : Date,
    default: Date.now
  },
  userId:{
    type:Schema.Types.ObjectId,
    ref:"users"
  }
})


contacts.plugin(mongoosePaginate);//for pagination

//******** Registering *******
mongoose.model("contacts",contacts);



//**********************************************************************************************************//
let ContactsModel = {}
ContactsModel.model = mongoose.model("contacts");

ContactsModel.addContact = (newContactData, callbackFn)=>{
    let contact = new ContactsModel.model(newContactData);
    contact.save((err, doc)=>{
        callbackFn(err, doc);
    });
}

ContactsModel.getContactList = (userId, pageNum, callbackFn)=>{
    ContactsModel.model.paginate({userId:userId},{page:pageNum ,limit:5},
      (err,doc)=>{
        callbackFn(err, doc);
      });
}

ContactsModel.getRecentContacts = (userId, callbackFn)=>{
    ContactsModel.model.find({userId:userId},{},{sort:{ time: -1 }, limit: 3},(err,doc)=>{
        callbackFn(err, doc);
      });
}

module.exports = ContactsModel;

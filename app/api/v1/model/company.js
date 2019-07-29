const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = bcrypt.genSaltSync(10);
//Define a schema
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
companyName: {
type: String,
trim: true,
required: true
},
username: {
type: String,
trim: true,
required: true,
unique:true
},
address:{
type:String,
trim:true,
},
email: {
type: String,
trim: true,
required: true,
unique:true
},
password: {
type: String,
trim: true,
required: true
},
phone: {
type: String,
trim: true,  
required: true,
},
isActive: {
    type: Number,
    default: 0,
},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});
// hash user password before saving into database
CompanySchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('Company', CompanySchema);
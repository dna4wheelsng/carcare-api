const companyModel = require('../model/company');

module.exports = {
createaccount: function(req, res, next){
userModel.create(
{
companyName:req.body.companyName,
username:req.body.username,
address:req.body.address,
email:req.body.email,
password:req.body.password,
phone:req.body.phone,
role:'company'
}, 
function (err, result) {
if (err) 
next(err);
else
res.json({status: "ok", message: "account created successfully"});
    
}
)  
},

authenticate: function(req, res, next) {
companyModel.findOne({username:req.body.username}, function(err, me){
if (err) {
next(err);
} else {
if(me != null && bcrypt.compareSync(req.body.password, me.password)) {
const token = jwt.sign({id: me._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 
res.json({status:"ok", message: "successful", data:{company:{id:me._id, fullname:me.fullname, email:me.email, phone:me.phone, username:me.username, address:me.address, createdAt: me.createdAt}, token:token}});
}else{
res.status(401).json({status:"error", message: "invalid details"});
}
}
});
},

}
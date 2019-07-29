//Set up mongoose connection
const mongoose = require('mongoose');
const localmongoDB = 'mongodb://localhost/carcare';
const mongoDB = 'mongodb://heroku_6cr66rs6:n3gkm2igd3hr0612gjbed9ug0l@ds261296.mlab.com:61296/heroku_6cr66rs6';
//mongoose.connect(localmongoDB);
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
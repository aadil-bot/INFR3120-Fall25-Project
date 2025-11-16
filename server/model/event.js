let mongoose = require('mongoose')

// create a model class
let eventModel = mongoose.Schema({
    name: String,
    organizer: String,
    date: String, 
    description: String,
    location: String
},
{
    collection:"Events"
}
);

module.exports = mongoose.model('Event',eventModel);
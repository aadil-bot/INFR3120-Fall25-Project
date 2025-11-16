let mongoose = require('mongoose')

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
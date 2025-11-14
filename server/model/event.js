let mongoose = require('mongoose')

// create a model class
let eventSchema = mongoose.Schema({
    name: String,
    organizer: String,
    date: String, 
    description: String,
    location: String
},
{
    collection:"events"
}
);

module.exports = mongoose.model('Event', eventModel);
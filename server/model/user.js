const { trim, type } = require('jquery');
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');
const { collection } = require('./event');

let User = mongoose.Schema({
    username:
    {
        type:String,
        default:"",
        trim:true,
        required:'Username is required'
    },

    profilePic:
    {
        type: String,
        default: "/images/defaultpfp.png"
    },

    // NEW FIELD — stores resized/cropped version
    profilePicSmall:
    {
        type: String,
        default: "/images/defaultpfp.png"
    },

    resetToken:
    {
        type: String,
        default: null
    },

    resetTokenExpiry:
    {
        type: Date,
        default: null
    },

    email:
    {
        type:String,
        default:"",
        trim:true,
        required:'email is required'
    },
    displayName:
    {
        type:String,
        default:"",
        trim:true,
        required:'displayName is required'
    },
    created:
    {
        type:Date,
        default:Date.now
    },
    updated:
    {
        type:Date,
        default:Date.now
    }
},
{
    collection:"user"
});

let options = ({MissingPasswordError:'Wrong/Missing Password'});
User.plugin(passportLocalMongoose,options);

module.exports.User = mongoose.model('User',User);

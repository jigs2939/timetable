const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        mobile:{
            type:String,
            required:true,
        },
        role:{
            type:String,    
            required:true,
        },
        status:{
            type:Boolean,
            default:true,
        }
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model('Person',personSchema)
const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema(
{
    day:{
        type:String,
        enum:[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]
    },

    shiftName:{
        type:String,
        required:true
    },

    startTime:{
        type:String,
        required:true
    },

    endTime:{
        type:String,
        required:true
    },

    assignedPersons:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Person"
        }
    ]
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Shift",shiftSchema);
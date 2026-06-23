const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"]
    },
    status:{
        type:String,
        enum:["Pending","In Progress","Completed"],
        default:"Pending"
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Person",
        default:null
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Task",taskSchema);
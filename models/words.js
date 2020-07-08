var mongoose= require("mongoose");
var cors=require('cors');

var wordSchema= new mongoose.Schema({
     Keyword:{type:String,index:true},
     Country:String,
     Difficulty: Number,
     Volume: Number,
     CPC: Number,
     Clicks: Number,
     CPS: Number 
});

//wordSchema.index( { Keyword : "text" } );
var Words=mongoose.model("Words",wordSchema);
module.exports=Words;
var mongoose = require("mongoose");
var Words=require("./models/words");
const csvtojson = require("csvtojson");

function seedDB(){
    Words.remove({},function(err){
       if(err)
           console.log(err);
       else{
        csvtojson().fromFile("keywords.csv").then(csvData => {
            Words.insertMany(csvData, (err, res) => {
            if (err) throw err;
            else console.log(`Inserted: ${res.insertedCount} rows`)});
        });
       }
    });
}

module.exports=seedDB;
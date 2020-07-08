var express=require("express");
var router=express.Router();
var Words=require("../models/words.js");
var cors=require('cors');
var commonWords=['the','at','there','some','my','of','be','use','her','than','and','this','an','would','first','best'];


router.get("/:word",function(req,res,next){
    var s=req.params.word;
   // Words.index({Keyword:"text"});
    if(s)
    {   console.log(s);
        s.trim();
        var wordList=s.split(" "); 
        var otherList=[];
        wordList.forEach(function(word){
            if(!commonWords.includes(word.toLowerCase()))
            {
                 otherList.push(word);
            }          
        });
        otherList.pop();
        //console.log(otherList);

        //var regex=new RegExp(escapeRegex(s.toLowerCase()),'gi');
        Words.find({$text:{$search: s.toLowerCase()}},function(err,words){
           if(err)
               console.log(err);
           else{
               //Array.prototype.push.apply(complete,words);
               var partial=[];
               var complete=[];
               words.forEach(function(word){
                   var w = s.toLowerCase().split(" ");
                   var f = 1;
                   w.forEach(function(w1){
                       if(!word.Keyword.includes(w1))
                           {
                               f=0;
                           }
                   });
                      if(f==1)
                          complete.push({'Keyword':word.Keyword,'MatchType':"Complete"});
                       else partial.push({'Keyword':word.Keyword,'MatchType':"Partial"});
               });
               res.json({complete:complete,partial:partial});
               //res.render('../views/show.ejs',{complete:complete,partial:partial});
            }
        });
    }
 
    //console.log(result);
    
});
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
};
module.exports=router;
const express=require("express");
const app=express();
const multer=require("multer");
var path = require('path');
var fs = require('fs');

app.set('view engine','ejs');
app.use(express.static(__dirname+"/public"))

app.get("/",(req,res)=>
{
    res.render("index",{allFiles:''});
})



const upload=multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>
        {
            cb(null,"/uploads");
        },
        filename:(req,file,cb)=>
        {
            cb(null,file.fieldname+"-"+Date.now()+'.jpg');
        }
    })
}).array("mypic");

app.post("/uploadPicture",upload,(req,res)=>
{
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        res.render("index",{allFiles:files});
    });

})

app.listen(3000);
var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contactApp',['contactApp']);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/dddd',function(req, res){
    console.log("Recievd requested data");

    db.contactApp.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactApp',function(req, res){
    console.log(req.body);
    db.contactApp.insert(req.body,function(err,doc){
        res.json(doc);
    });

});

app.delete('/delContact/:id',function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactApp.remove({_id:mongojs.ObjectId(id)}, function(err,doc){
        res.json(doc);
    })
});

app.get('/editContact/:id',function(req, res){
    var id = req.params.id;
    console.log(id);
    db.contactApp.findOne({_id:mongojs.ObjectId(id)},function(err, doc){
        res.json(doc);
    });
});

app.put('/updateContact/:id',function(req, res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactApp.findAndModify({query:{_id: mongojs.ObjectId(id)},
        update:{$set: {name:req.body.name, email: req.body.email,number: req.body.number}},
        new:true},function(err,doc){
        res.json(doc);

    });
});

app.listen(3000);
console.log("server running");

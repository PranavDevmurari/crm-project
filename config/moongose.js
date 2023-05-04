const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/hospital")

const db = mongoose.connection;

db.once('open',function(err){
    if(err){
        console.log(err);
        return false;
    }
    console.log("mongoose is connected")
})

module.exports =db;
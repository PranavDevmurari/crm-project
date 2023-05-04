const mongoose = require('mongoose');

const hospitalschema = mongoose.Schema({
    hname : {
        type : String,
        required : true
    },
    haddress : {
        type : String,
        required : true
    },
    hcity : {
        type : String,
        required : true
    },
    isactive :{
        type : Boolean
    }
})

const hospital = mongoose.model('hospital',hospitalschema);

module.exports = hospital
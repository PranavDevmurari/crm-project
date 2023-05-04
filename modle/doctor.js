const mongoose = require('mongoose');

const doctorschema = mongoose.Schema({
    hospitalid:{
        type :mongoose.Schema.Types.ObjectId,
        ref :'hospital',
        required : true
    },
    
    name:{
        type: String,
        required:true
    },
    qualification:{
        type: String,
        required : true
    },
    salary :{
        type: String,
        required : true
    },
    isactive:{
        type : Boolean
    }
});

const doctor = mongoose.model('doctor',doctorschema);

module.exports = doctor;
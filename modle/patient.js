const mongoose = require('mongoose');

const patientschema = mongoose.Schema({
    
    hospitalid:{
        type :mongoose.Schema.Types.ObjectId,
        ref :'hospital',
        required : true
    },
    doctorid:{
        type :mongoose.Schema.Types.ObjectId,
        ref :'doctor',
        required : true
    },
    pname : {
        type : String,
        required : true
    },
    pdiagnosis : {
        type : String,
        required : true
    },
    paddress : {
        type : String,
        required : true
    },
    isactive :{
        type :Boolean
    }
})

const patient = mongoose.model('patient',patientschema);

module.exports = patient;
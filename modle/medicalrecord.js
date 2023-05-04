const mongoose = require('mongoose');

const medicalrecordschema = mongoose.Schema({
    
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
    patientid:{
        type :mongoose.Schema.Types.ObjectId,
        ref :'patient',
        required : true
    },
    mrproblem : {
        type : String,
        required : true
    },
    mrdate : {
        type : Date,
        required : true
    }
})

const medicalrecord = mongoose.model('medicalrecord',medicalrecordschema);

module.exports = medicalrecord;
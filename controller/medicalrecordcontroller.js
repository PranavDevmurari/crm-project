const hospital = require('../modle/hospital');
const doctor = require('../modle/doctor');
const patient = require('../modle/patient');
const medicalrecord = require('../modle/medicalrecord');


module.exports.add_medicalrecord = async function(req,res){
    // console.log("hvjd")
    let hospitaldata = await hospital.find({});
    return res.render('add_medicalrecord',{
        'hospital' : hospitaldata
    })
}

module.exports.patientdata = async function(req,res){
    // console.log("abc")
    let patientdata = await patient.find({'patientid':req.body.patientid})
    if(patientdata){
        return res.render('getpatient',{
            'getpatient' : patientdata
        })

    }
    
}

module.exports.add_medicalrecorddata = async function(req,res){
    let medicalrecorddata = await medicalrecord.create(req.body);
    if(medicalrecorddata){
        console.log("medicalrecorddata inserted");
        return res.redirect('back')
    }
    else{
        console.log("medicalrecorddata not inserted");
        return res.redirect('back')
    }
}

module.exports.view_medicalrecord= async function(req,res){
    let mrdata = await medicalrecord.find({}).populate('hospitalid').populate('doctorid').populate('patientid');
    if(mrdata){
        return res.render('view_medicalrecord',{
            'mrdata' : mrdata
        })
    }
}


module.exports.deletedata = async function(req,res){
    let medrecord = await medicalrecord.findByIdAndDelete(req.params.id);
    return res.redirect('back')
}
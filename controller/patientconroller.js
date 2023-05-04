const hospital = require('../modle/hospital');
const doctor = require('../modle/doctor');
const patient = require('../modle/patient');

module.exports.add_patient = async function(req,res){
    let hospitaldata = await hospital.find({});
    return res.render('add_patient',{
        'hospital' : hospitaldata
    })
}

module.exports.doctordata = async function(req,res){
    // console.log(req.body.hospitalid)
    let docordata = await doctor.find({'hospitalid':req.body.hospitalid})
    if(docordata){
        return res.render('getdoctor',{
            'getdoctor' : docordata
        })

    }
    
}

module.exports.add_patientdata = async function(req,res){
    req.body.isactive = 1;
    let patientdata = await patient.create(req.body);
    if(patientdata){
        console.log("patientdata inserted");
        return res.redirect('back')
    }
    else{
        console.log("patientdata not inserted");
        return res.redirect('back')
    }
}

module.exports.view_patient= async function(req,res){
    
    let activedata = await patient.find({'isactive' : 1}).populate('hospitalid').populate('doctorid');
    let deactivedata = await patient.find({'isactive' : 0}).populate('hospitalid').populate('doctorid');
        return res.render('view_patient',{
            activedata : activedata,
            deactivedata : deactivedata
        })
}

module.exports.deactive = async function(req,res){
    let patdata = await patient.findByIdAndUpdate(req.params.id, 
        {isactive : 0}
    );

    return res.redirect('back')
}   
module.exports.active = async function(req,res){
    let patdata = await patient.findByIdAndUpdate(req.params.id, 
        {isactive : 1}
    );

    return res.redirect('back')
}  
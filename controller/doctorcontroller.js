const hospital = require('../modle/hospital');
const doctor = require('../modle/doctor')

module.exports.add_doctor = async function(req,res){
    let hospitaldata = await hospital.find({});
    return res.render('add_doctor',{
        'hospital' : hospitaldata
    })
}

module.exports.add_doctordata = async function(req,res){
    req.body.isactive = true;
    let doctordata = await doctor.create(req.body);
    if(doctordata){
        console.log("docordata inserted");
        return res.redirect('back')
    }
    else{
        console.log("docordata not inserted");
        return res.redirect('back')
    }
}

module.exports.view_doctor= async function(req,res){
    // let docordata = await doctor.find({}).populate('hospitalid');
    let activedata = await doctor.find({'isactive' : 1}).populate('hospitalid');
    let deactivedata = await doctor.find({'isactive' : 0}).populate('hospitalid')
        return res.render('view_doctor',{
            activedata : activedata,
            deactivedata : deactivedata
        })
}

module.exports.deactive = async function(req,res){
    let docdata = await doctor.findByIdAndUpdate(req.params.id, 
        {isactive : 0}
    );

    return res.redirect('back')
}   
module.exports.active = async function(req,res){
    let docdata = await doctor.findByIdAndUpdate(req.params.id, 
        {isactive : 1}
    );

    return res.redirect('back')
}   
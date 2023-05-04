const hospital = require('../modle/hospital');
const doctor = require('../modle/doctor');
const patient = require('../modle/patient');
const medicalrecord = require('../modle/medicalrecord');
const register = require('../modle/register'); 

const nodemailer = require("nodemailer");
// const cookies = require('co')

module.exports.add_register = function(req,res){
    return res.render('add_register')
}
module.exports.login = function(req,res){
    return res.render('login')
}

module.exports.add_registerdata = async function(req,res){    
    let add_registerdata = await register.create(req.body);
    if(add_registerdata){
        console.log("register data inserted");
        return res.redirect('login')
    }
    else{
        console.log("register data not inserted")
        return res.redirect('back')
    }
}

module.exports.sessioncreate = function(req,res){
    return res.redirect('/mainindex');
}

module.exports.forgetpassword = function(req,res){
    return res.render('lostpass')
}

module.exports.changepass = async function(req,res){
    return res.render('changepassword')
};

module.exports.editpassword = async function(req,res){    
    var oldpass = req.user.password;   
    var oldpassword =  req.body.password;
    var npass =  req.body.npass;
    var copass =  req.body.copass;

    if(oldpass == oldpassword){
        if(oldpassword != npass){
            if(npass == copass){
                let registerdata = await register.findByIdAndUpdate(req.user.id,{
                    password : npass })               
                    return res.redirect('/logout')                                                    
                }
            
            else{
                console.log("new password and conform password match")
                return res.redirect('back')            
            }
        }
        else{
            console.log("old password and new password match")
            return res.redirect('back')            
        }
    }
    else{
        console.log("old password not match")
        return res.redirect('back')
    }
}


module.exports.sendemail = async function(req,res){
    let emaildata = await register.findOne({email:req.body.email}) ;
    if(emaildata){
        var otp = Math.ceil(Math.random()*10000);
        console.log(otp);
        console.log(emaildata)
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "aa28b6b27b2d4f",
              pass: "5d03114fd3bc0f"
            }
          });
        
          // send mail with defined transport object
          let info =  transport.sendMail({
            from: 'pranavad76@gmail.com', // sender address
            to: emaildata.email, // list of receivers
            subject: "otp", // Subject line
            text: "Hello world?", // plain text body
            html:  `<b>your otp is:${otp}</b>` , // html body
          });
          res.cookie('otp', otp);
          res.cookie('email', emaildata.email);
        //   req.flash('success', ' OTP sending successfully')
          return res.redirect('/checkotp');
          
        //   else{
        //     console.log("email not sent");
        //     return res.redirect('/back')
        //   }
    }
    else{
        console.log("record not found");
            return res.redirect('/forgetpassword')
    }
      
}

module.exports.checkotp = function (req, res) {
    return res.render('checkotp');
}

module.exports.verifyotp = function (req, res) {

    if (req.body.otp == req.cookies.otp) {
        return res.redirect('/generatenewpass');        
    }
    else {
        
        return res.redirect('/checkotp');
    }
}

module.exports.generatenewpass = function (req, res) {
    return res.render('generatenewpass');
}

module.exports.resetpassword = async function (req, res) {
    if (req.body.npassword == req.body.copassword) {
        let email = await req.cookies.email;
        console.log(email)
        let emaildata = await register.findOne({ 'email': email });
        
            // if (err) {
            //     console.log(err);
            //     return res.redirect('back');
            // }
            console.log(emaildata.id)
            if (emaildata) {
                // console.log(record, 'reset');
                let newpass = await register.findByIdAndUpdate(emaildata.id, {password: req.body.npassword });
                    if (newpass) {
                        return res.redirect('/logout');
                    }
                    else {
                        return res.redirect('back');
                    }
                }
        }
        }
        // else{
        // return res.redirect('back');
        //     console.log("password and conform password not match");
        // }

    // else {
    //     req.flash('error', 'Password not match');
    //     return res.redirect('/generatenewpass');
    // }
    
// 
// 
// 
module.exports.mainindex = function(req,res){
    return res.render('index')
}
module.exports.add_hospital = function(req,res){
    return res.render('add_hospital')
}

module.exports.add_hospitaldata = async function(req,res){
    req.body.isactive = "true"
    let hospitaldata = await hospital.create(req.body);
    if(hospitaldata){
        console.log("hospital data inserted");
        return res.redirect('back')
    }
    else{
        console.log("hospital data not inserted")
        return res.redirect('back')
    }
}

module.exports.view_hospital = async function(req,res){    
    var search = '';
    if(req.query.search){
        search = await req.query.search
    }

    var page = 1 ;
    if(req.query.page){
        page = await req.query.page       
    }
    var per_page = 2;

    if(search.length>0){
        var activedata = await  hospital.find({   
            isactive :1,   
            $or : [
                {hname : {$regex : '.*'+search+'.*'}}
            ] 
        })
        .skip((page-1)*per_page)
        .limit(per_page)
        .exec();
        // console.log(search)
    }else{
       
        var activedata = await  hospital.find({
            isactive : 1
        }).skip((page-1)*per_page)
        .limit(per_page)
        .exec();
    }

    var countdata = await  hospital.find({
        $or : [
            {hname : {$regex : '.*'+search+'.*'}},
          
        ]
    }).countDocuments();
    
    let deactivedata = await hospital.find({'isactive' : 0})


        return res.render('view_hospital',{
            // 'hospitaldata': hospitaldata,
            'activedata' : activedata,
            'deactivedata' : deactivedata,
            'countdata' : Math.ceil(countdata/per_page),
            'searchrecord' : search
        })
}

module.exports.deactive = async function(req,res){
    let hosdata = await hospital.findByIdAndUpdate(req.params.id, 
        {isactive : 0}
    );

    return res.redirect('back')
}   
module.exports.active = async function(req,res){
    let hosdata = await hospital.findByIdAndUpdate(req.params.id, 
        {isactive : 1}
    );

    return res.redirect('back')
}   

// user





module.exports.viewhospital = async function(req,res){
    let hospitaldata = await hospital.find({isactive:1});
    return res.render('user_view_hospital',{
        hosdata : hospitaldata
    })
}
module.exports.viewdoctor = async function(req,res){
    let doctordata = await doctor.find({isactive:1}).populate('hospitalid');
    return res.render('user_view_doctor',{
        docdata : doctordata
    })
}
module.exports.viewpatient = async function(req,res){
    let patientdata = await patient.find({'isactive' : 1}).populate('hospitalid').populate('doctorid');
    return res.render('user_view_patient',{
        patdata : patientdata
    })
}
module.exports.viewmedicalrecord = async function(req,res){
    let mrdata = await medicalrecord.find({}).populate('hospitalid').populate('doctorid').populate('patientid');
    return res.render('user_view_medicalrec',{
        meddata : mrdata
    })
}
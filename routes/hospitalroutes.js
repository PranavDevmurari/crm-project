const express = require('express');
const route = express.Router();
const hospitalcontroller = require('../controller/hospitalcontroller')
const passport = require('passport')

route.get('/add_register',hospitalcontroller.add_register)
route.get('/login',hospitalcontroller.login)
route.post('/add_registerdata',hospitalcontroller.add_registerdata);
route.get('/changepass',passport.checkauthentication,hospitalcontroller.changepass);
route.post('/editpassword',passport.checkauthentication,hospitalcontroller.editpassword);


route.get('/logout', function(req,res,next){
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/login')
    })
})

route.get('/forgetpassword',hospitalcontroller.forgetpassword);

route.post('/sendemail',hospitalcontroller.sendemail);

route.get('/checkotp',hospitalcontroller.checkotp);
route.post('/verifyotp', hospitalcontroller.verifyotp);
route.get('/generatenewpass',hospitalcontroller.generatenewpass)
route.post('/resetpassword', hospitalcontroller.resetpassword);


route.post('/sessioncreate',passport.authenticate('local', {failureRedirect : '/login'}),hospitalcontroller.sessioncreate);
// 




route.get('/backend',passport.checkauthentication,hospitalcontroller.mainindex)
route.get('/mainindex',passport.checkauthentication,hospitalcontroller.mainindex)
route.get('/add_hospital',passport.checkauthentication,hospitalcontroller.add_hospital)

route.post('/add_hospitaldata',passport.checkauthentication,hospitalcontroller.add_hospitaldata)

route.get('/view_hospital',passport.checkauthentication,hospitalcontroller.view_hospital)

route.get('/deactive/:id',passport.checkauthentication,hospitalcontroller.deactive)
route.get('/active/:id',passport.checkauthentication,hospitalcontroller.active)

// user



route.get('/',hospitalcontroller.viewhospital);



route.get('/viewdoctor',hospitalcontroller.viewdoctor);
route.get('/viewpatient',hospitalcontroller.viewpatient);
route.get('/viewmedicalrecord',hospitalcontroller.viewmedicalrecord);



route.use('/doctor',require('../routes/doctorroutes'))
route.use('/patient',require('../routes/patientroutes'))
route.use('/medicalrecord',require('../routes/medicalrecordroutes'))
module.exports= route;


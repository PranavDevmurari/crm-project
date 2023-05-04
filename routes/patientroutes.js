const express = require('express');
const passport = require('passport')
const route = express.Router();
const patientcontroller = require('../controller/patientconroller')
route.get('/add_patient',passport.checkauthentication,patientcontroller.add_patient);
route.post('/doctordata',passport.checkauthentication,patientcontroller.doctordata);
route.post('/add_patientdata',passport.checkauthentication,patientcontroller.add_patientdata);

route.get('/view_patient',passport.checkauthentication,patientcontroller.view_patient);
route.get('/deactive/:id',passport.checkauthentication,patientcontroller.deactive);
route.get('/active/:id',passport.checkauthentication,patientcontroller.active);


module.exports = route;
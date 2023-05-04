const express = require('express');
const passport = require('passport')
const route = express.Router();
const medicalrecordcontroller = require('../controller/medicalrecordcontroller')
route.get('/add_medicalrecord',passport.checkauthentication,medicalrecordcontroller.add_medicalrecord);
route.post('/patientdata',passport.checkauthentication,medicalrecordcontroller.patientdata);
route.post('/add_medicalrecorddata',passport.checkauthentication,medicalrecordcontroller.add_medicalrecorddata);

route.get('/view_medicalrecord',passport.checkauthentication,medicalrecordcontroller.view_medicalrecord)
route.get('/deletedata/:id',passport.checkauthentication,medicalrecordcontroller.deletedata)
module.exports = route;
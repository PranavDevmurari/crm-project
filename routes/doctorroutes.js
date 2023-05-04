const express = require('express');
const passport = require('passport')

const route = express.Router();
const doctorcontroller = require('../controller/doctorcontroller')
route.get('/add_doctor',passport.checkauthentication,doctorcontroller.add_doctor);
route.post('/add_doctordata',passport.checkauthentication,doctorcontroller.add_doctordata);
route.get('/view_doctor',passport.checkauthentication,doctorcontroller.view_doctor);

route.get('/deactive/:id',passport.checkauthentication,doctorcontroller.deactive);
route.get('/active/:id',passport.checkauthentication,doctorcontroller.active);


module.exports = route;
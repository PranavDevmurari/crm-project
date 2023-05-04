const { use } = require('passport');
const passport = require('passport');
const Admindata = require('../modle/register');

const passportlocal = require('passport-local').Strategy;

console.log("Passport Is Running");

passport.use(new passportlocal({
    usernameField : 'email'
}, async function(email,password,done){
    
    let admindata = await Admindata.findOne({email : email})
    if(admindata.password == password)
    {
        return done(null,admindata);
    }
    else{
        console.log("Invaliad Details !!");
        return done(null,false);
    }

}))

passport.serializeUser(function(user,done){
    return done(null,user.id);
})

passport.deserializeUser(async function(id,done){

    let admindata = await Admindata.findById(id);
        if(admindata)
        {
            return done(null,admindata);
        }
        else{
            console.log("Data Not Match !!");
            return done(null,err);

        }
    })


passport.checkauthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/login')
}

passport.setauthenticationuser =function(req,res,next){    
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;
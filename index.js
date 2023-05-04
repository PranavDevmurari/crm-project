const express = require('express');

const port = 9099;

const app = express();

const path = require('path');

// const db = require('./config/moongose');
mongoose.connect("mongodb+srv://pranavad76:pranav@69896@crmproject.vkaho7b.mongodb.net/test" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected!...");
}).catch(err => {
    console.log("Error connecting to DB:", err);
});
const passport = require('passport');
const session = require('express-session');



const passportLocal = require('./config/passport-local-strategy');

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'html'));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.static('assets'));
app.use(express.urlencoded())

app.use(session({
    name : "pranav",
    secret : "Me",
    resave : true,
    saveUninitialized : false,
    cookie : {
        maxAge : 60*100*1000
    }
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setauthenticationuser)




app.use('/',require('./routes/hospitalroutes'));


app.listen(port,function(err){
    if(err){
        console.log(err);
    }
    console.log("this port is running port :",port);
})
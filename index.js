const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

require('./model/model');

require('./config/passport');

const router = require('./routes');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,}));
app.use(require('./routes'));

// use the router
app.use(router);


app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})


// for all routes in routes, check that the user is logged in and if not, redirect to login page

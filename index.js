const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./database/database');
const router = require('./routes');
const app = express();

require('./model/model');
require('./config/passport');

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


app.use(router);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})

// If DB is not working, check that your IP is whitelisted from MongoDB or not 
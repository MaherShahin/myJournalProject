const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./database/database');
const cors = require('cors');

const app = express();

require('./model/model');
require('./config/passport');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.static(path.join(__dirname, 'public/react-frontend')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require('./routes');
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,}));


app.use(require('./routes'));
app.use(router);

app.use(express.json());



app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "public/build")));
    app.get("*", (req, res) => {
      res.sendfile(path.join((__dirname = "public/build/index.html")));
    });
  }

// If DB is not working, check that your IP is whitelisted from MongoDB or not 
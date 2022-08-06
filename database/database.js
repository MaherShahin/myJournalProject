const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const database = mongoose.connection;

database.on('error', (err) => {
    console.log(err);
})
database.once('open', () => {
    console.log('Connected to database');
})
database.on('disconnected', () => {
    console.log('Disconnected from database');
})

function checkUser(username) {
    return database.collection('users').findOne({ username: username });
}

module.exports = database;
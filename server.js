const app = require('./app.js');
const mongoose = require('mongoose');

require('dotenv').config({path: 'variables.env'});

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('ERROR: ' + error.message);
});

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
    console.log('Server running in port: ' + server.address().port); //show in terminal
}); //listen port
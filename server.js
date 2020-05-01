const app = require('./app.js');

require('dotenv').config({path: 'variables.env'});

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
    console.log('Server running in port: ' + server.address().port); //show in terminal
}); //listen port
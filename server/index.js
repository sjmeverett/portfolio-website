require('babel/register');
var Server = require('./Server').default;
var server = new Server();
server.start();
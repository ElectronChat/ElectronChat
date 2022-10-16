let express = require( 'express' );
let http = require('http');
let app = express();
let app1 = express();
require('dotenv').config();
const { Server } = require("socket.io");
app1.disable("x-powered-by");


// we need to include any of our created routes so it will be 'linked'
const home = require('./app/routes/main');
const HandleIo = require("./app/Models/HandleIo.cjs");
const server = http.createServer(app)
const io = new Server(server);

// this is our directory where all of our frontend gets built to.
var distDir = __dirname + "/front/";
app.use(express.static('../front-end-main/dist'));


// here is our routing pipeline, we reference each of our routing modules that we need right here.
// the first route is how we will start creating our routes.
app.use('/', home);

// socket.io handler
var handler = new HandleIo(io)

const hostname = process.env.host;
const port = process.env.PORT;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//test function for mocha test
module.exports = function() {
  return 'hello';
}

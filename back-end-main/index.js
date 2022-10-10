let express = require( 'express' );
let http = require('http');
let app = express();
let app1 = express();
const { Server } = require("socket.io");
app1.disable("x-powered-by");
// we need to include any of our created routes so it will be 'linked'
const home = require('./app/routes/main')
const server = http.createServer(app)
const io = new Server(server);

// this is our directory where all of our frontend gets built to. 
var distDir = __dirname + "/front/";
app.use(express.static('../front-end-main/dist'));


// here is our routing pipeline, we reference each of our routing modules that we need right here.
// the first route is how we will start creating our routes.
app.use('/', home);

HandleIO(io);

const hostname = '69.48.142.114';
const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
//test function for mocha test
module.exports = function() {
  return 'hello';
}


function HandleIO(io)
{
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });
}

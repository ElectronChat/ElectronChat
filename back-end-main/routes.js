let express = require( 'express' );
let http = require('http');
const main = require('./app/routes/main')

let app1 = express();  // Compliant
app1.disable("x-powered-by");
let app = express()
var distDir = __dirname + "/front/";
app.use(express.static('/home/back-end/front'));

app.use('/home',main)

app.get('/', (req,res)=>
{
     res.sendFile('/home/back-end/front/index.html');
});

const hostname = '69.48.142.114';
const port = 80;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

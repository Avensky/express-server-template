// server.js //
//==============================================================================
// set up ======================================================================
//==============================================================================
const express       = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const app           = express()
const PORT          = process.env.PORT || 5000;
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser');
const cors          = require("cors");
const session       = require('express-session')
const passport      = require('passport')
const mongoose      = require('mongoose')
const keys          = require('./config/keys')
const flash         = require('connect-flash')
const dotenv	      = require('dotenv').config({path:__dirname+'/config/config.env'})

//==============================================================================
// configuration ===============================================================
//==============================================================================
require('./app/models/users');
require('./config/passport')(passport); // pass passport for configuration

mongoose.Promise = global.Promise;// connect to our database
mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true 
})
    .then(connect => console.log('connected to mongodb'))
    .catch(err => console.log('could not connect to mongodb', err))
module.exports = {mongoose}

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// app.use(logger('dev')); // log every request to the console
app.use(express.json())
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser.json())    
app.use(bodyParser.urlencoded({extended: false})) // get information from html forms
// app.use(bodyParser.json({
//   verify: (req, res, buf) => {
//     req.rawBody = buf
//   }
// }))

// required for passport
app.use(session({ 
  secret: 'ilovescotchscotchyscotchscotch',   // session secret
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 30*24*60*60*1000,
  }
})); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// proxy middleware options
// const options = {
//   target: 'http://www.uriza86.com', // target host
//   changeOrigin: true, // needed for virtual hosted sites
//   ws: true, // proxy websockets
//   pathRewrite: {
//     '^/api/old-path': '/api/new-path', // rewrite path
//     '^/api/remove/path': '/path', // remove base path
//   },
//   router: {
//     // when request.headers.host == 'dev.localhost:3000',
//     // override target 'http://www.example.org' to 'http://localhost:8000'
//     'dev.localhost:3000': 'http://localhost:5000',
//   },
// };
// 
// // create the proxy (without context)
// const exampleProxy = createProxyMiddleware(options);

// mount `exampleProxy` in web server
//app.use('/api', exampleProxy);
//==============================================================================
// routes ======================================================================
//==============================================================================
require('./app/routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

//==============================================================================
// launch ======================================================================
//==============================================================================
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, (err) =>{
  if(!err){
      console.log('server started running on: ' + PORT);
      console.log('server NODE_ENV:  ' + process.env.NODE_ENV);
  } else {
      console.log('unable to start server');}    
})
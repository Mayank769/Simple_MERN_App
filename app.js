var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter=require('./routes/testAPI');
var app = express();
var seedDB=require('./seeds');
var mongoose=require('mongoose');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
var link="mongodb+srv://CampUser:"+process.env.password+"@cluster0-n8dvw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(link,{
useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true}).then(()=>{console.log("connected");}).catch(err=>      {console.log("ERROR:",err.message);});
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//seedDB();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use('/testAPI',testAPIRouter);
if ( process.env.NODE_ENV === 'production' ) {
	// Set a static folder
	app.use( express.static(path.resolve( __dirname, 'client/build' ) ));
	app.get( '*', ( req, res ) => res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) ) );

}

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const port =process.env.PORT ||3000;
app.listen(port);

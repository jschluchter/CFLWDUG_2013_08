
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , mongoose = require('mongoose')
  , mongolab = "mongodb://demo:demo@ds031088.mongolab.com:31088/cfla"
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/color', routes.color);
app.get('/colors', routes.getColors);
app.post('/color/save', routes.colorsave);
app.get('/users', user.list);
app.get('/user/:id', function(req, res) {
  res.send('user' + req.params.id);
});

http.createServer(app).listen(app.get('port'), function(){


	// mongoose.connect(mongolab);

	
	// var Cat = mongoose.model('Cat', { name: String });

	// var kitty = new Cat({ name: 'Zildjian' });
	// kitty.save(function (err) {
	//   if (err) // ...
	//   console.log('meow');
	// });


  	console.log('Express server listening on port ' + app.get('port'));
});

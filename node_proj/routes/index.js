var mongoose = require('mongoose')
  , mongolab = "mongodb://demo:demo@ds031088.mongolab.com:31088/cfla"
  , Color = mongoose.model('Color', { name: String, choice: String, id : String })
  , async = require('async')
  , uuid = require('node-uuid');



exports.index = function(req, res){
  res.render('index', { title: 'Central Florida Web Developers User Group' });
};

exports.color = function(req, res){
	res.render('color', {title: 'whats your favorite color'});
};

exports.colorsave = function(req, res){
	var colors;
    async.series([
        function (n) {
        	mongoose.connect(mongolab);
        	n(null, 'mongo connection');
        },
        function (n) {
        	var fave = new Color({ name: req.body.name, choice : req.body.choice, Id : uuid.v4() });
        	fave.save(function (err) {
        		if (err) console.log('uhh, no color for you');
        		n(null, 'save color');
        	});
        },
        function (n) {
        	Color.find({}, function (err, data) {
        		if (err) console.log(err);
        		colors = data;
        		n(null, 'get all colors');
        	});
        }],
        function (err, results) {
        	if(err) console.log('this is a demo and demos go wrong');
        	mongoose.connection.close();
        	console.log(colors);
        	res.render('colorsaved', {title: 'the groups colors', groupcolors: colors});
        });
};

exports.getColors = function(req, res){
	var colors;
    async.series([
        function (n) {
        	mongoose.connect(mongolab);
        	n(null, 'mongo connection');
        },
        function (n) {
        	Color.find({}, function (err, data) {
        		if (err) console.log(err);
        		colors = data;
        		n(null, 'get all colors');
        	});
        }],
        function (err, results) {
        	if(err) console.log('this is a demo and demos go wrong');
        	mongoose.connection.close();
        	console.log(colors);
        	res.render('colorsaved', {title: 'the groups colors', groupcolors: colors});
        });
};
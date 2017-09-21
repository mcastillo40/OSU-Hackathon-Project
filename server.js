var express = require('express');
var app = express();
app.set('port', 3000);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
}); 

// Statc middleware
app.use(express.static(__dirname + '/public'));

//var meetupKeyID = '3b5cd41e32702b161a85e68646bb';  // Meet up API Key
//var eventBriteKeyID = 'DPQNSMGH5QBIBWDPNRZO';      // EventBrite API key

// Route to index.html
app.use(function(req, res) {
    res.send('index.html');
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

// Search route
// app.get('/search', function(req, res) {
//   var context = {};
//   var artist = req.query.searchKey;
 
// });

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

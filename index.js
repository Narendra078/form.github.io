const express = require('express')
var mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false}))
app.set('view engine', 'pug')

app.get('/',function(req,res){
	res.sendFile('index.html', { root : __dirname })
})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express'
})

connection.connect(function(err){
	 if (err) throw err;

	 console.log('connected..');
})


app.post('/submit', function(req,res){
	console.log(req.body);

	var sql = "insert into expressjs values(null,'"+req.body.name+"', '"+req.body.password+"', '"+req.body.email+"','"+req.body.comment+"')";
	connection.query(sql, function (err) {
  if (err) throw err
  		res.render('index',{
		title:'express',
		message:'Data saved successfully.'})

})
connection.end();

})


app.listen(port,() =>
	console.log(`Example app listening on port ${port}!`))
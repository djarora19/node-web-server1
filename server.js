const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			log('Unable to append to server.log');
		}

	});

	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello World !</h1>');

	// res.send({
	// 	name: 'Divyangkumar',
	// 	age: 24,
	// 	hobby: 'Running'
	// })

	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Hello there! You are seeing a website made with Express'
	});
});

app.get('/about', (req, res) => {
	//res.send('About Page');
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to connect.'
	});
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000 !');
});
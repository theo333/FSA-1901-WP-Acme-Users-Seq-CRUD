const express = require('express');
const app = express();
const { User } = require('./db');
const renderPage = require('./views');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

module.exports = { app };

// app.set('view engine', 'html');
// app.engine('html', ejs.renderFile);

// app.use(express.json());  // not working
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(methodOverride('_method'));

app.get('/', (req, res, next) => {
	res.redirect('/users');
});

app.get('/users', (req, res, next) => {
	User.findAll()
	.then(users => res.send(renderPage(users)))
	.catch(next)
	;
});

app.get('/users/:id', (req, res, next) => {
	User.findAll()
		.then(users => res.send(renderPage(users, req.params.id)))
		.catch(next)	
});

app.post('/users/:id', (req, res, next) => {
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName
	})
	// .then(user => user.save())
	.then(() => res.redirect('/users'))
	.catch(next)
});

app.delete('/users/:id', (req, res, next) => {
	User.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(() => res.redirect('/users'))
	.catch(next);
});

app.put('/users/:id', (req, res, next) => {
	// User.findOne({
	// 	where: { id: req.params.id }
	// })
	// .then(user => res.send(user.id))
	
	User.update({
		firstName: req.body.firstName,
		lastName: req.body.lastName
	}, {
		where: { id: req.params.id}
	})
	.then(validationCode => {
		if (validationCode[0]) {
			res.redirect('/users')
		} else {
			res.send(`
				<!DOCTYPE html>
				<html>
					<body>
						<h1>Acme Users Seq CRUD</h1>
						<p>Sorry, user does not exist.</p>
						<p><a href="/users">Return to home page.</a></p>
					</body>
				</html>
			`)
		}
	})
	.catch(next);
});

// <% users.map( user => {
// 	return %>
// 	<% user.firstName %>
	
// <% }) %>
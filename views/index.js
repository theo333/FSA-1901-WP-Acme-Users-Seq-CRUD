
module.exports = (users, userId) => {
	// if userId, then display form for PUT method 
	if (userId) {
		var _user = users.find( user => user.id === userId*1);

		var form = `
			<form method="post" action="/users/${userId}/?_method=put">
				<input type="text" name="firstName" placeholder="first name" value="${_user.firstName}">
				<input type="text" name="lastName" placeholder="last name" value="${_user.lastName}">
				<button type="submit">Update</button>
				<a href="/users">Cancel</a>
			</form>
		`;
	} else {
		// action="/users/somethngs"  -> somethngs - ?? how to get user id ?
		var form = `
			<form method="post" action="/users/somethngs">
				<input type="text" name="firstName" placeholder="first name">
				<input type="text" name="lastName" placeholder="last name">
				<button type="submit">Create</button>
				<a href="/users">Cancel</a>
			</form>
		`;
	}

	return `
	<!DOCTYPE html>
	<html>
		<head>
			<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" type="text/css"/>
			<title>Acme Users Seq CRUD</title>
		</head>
		<body>
			<div class="container">
				<h1>Acme Users Seq CRUD</h1>
				<ul class="list-group">
					${users.map( user => {
						return `
							<li class="list-group-item">
								<a href="/users/${user.id}">${user.firstName} ${user.lastName}</a>
								<form method="post" action="/users/${user.id}?_method=delete">
									<button class="btn btn-danger">Delete</button>
								</form>
							</li>			
						`;
					}).join('')}
					
				</ul>
				${form}
			</div>
		</body>
	</html>
`; 
}
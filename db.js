const Sequelize = require('sequelize');
const conn  = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
	firstName: Sequelize.STRING,
	lastName: Sequelize.STRING
});

const syncAndSeed = () => {
	conn.sync( { force: true } )
		//* for test seeding purposes
		// .then(() => {
		// 	User.create({
		// 		firstName: 'Joe',
		// 		lastName: 'Smith'
		// 	});
		// 	User.create({
		// 		firstName: 'Jenny',
		// 		lastName: 'Rhodes'
		// 	});
		// })
};

module.exports = { User, syncAndSeed }
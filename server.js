const { app } = require('./app');
const { syncAndSeed } = require('./db');

const port = process.env.PORT || 3001;

app.listen(port, console.log(`listening on port ${port}`));

syncAndSeed();




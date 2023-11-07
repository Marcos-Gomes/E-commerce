require('dotenv').config();
const app = require('./server');

const port = process.env.SERVER_PORT || 3000;

app.listen(port);
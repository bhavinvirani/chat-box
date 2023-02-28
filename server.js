require('dotenv').config({ path: './.env' });
const colors = require('colors');
const app = require('./app');
const connectDB = require('./DB/connectDB');
connectDB();

//Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App running on port ${port}`.yellow.bold);
});

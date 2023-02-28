require('dotenv').config({ path: './.env' });
const app = require('./app');

//Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

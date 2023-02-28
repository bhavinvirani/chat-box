require('dotenv').config({ path: './.env' });
const connectDB = require('./DB/connectDB');
const colors = require('colors');
const app = require('./app');
// connectDB();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    },
});

//Start the server
// io.on('connection', (socket) => {
//     console.log('New user connected');

//     socket.on('new-message', (message) => {
//         console.log(message);
//         io.emit('new-message', message);
//     });

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });
// });
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`App running on port ${port}`.yellow.bold);
});

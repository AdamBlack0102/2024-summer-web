const express = require('express');

const router = require('./router/user')

require('./database/init')
require('./database/models/User')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use('/user', router)

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Welcome to the backend!');
});

app.listen(4000, () => {
    console.log('Server is running on port: 4000.');
});
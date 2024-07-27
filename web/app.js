const express = require('express');

const router = require('./router/user')

require('./database/init')
require('./database/models/User')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/user', router)

app.listen(4000, () => {
    console.log('Server is running on port: 4000.');
});
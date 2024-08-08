const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('http://localhost:63342/web02/front/src/pages/login_register.html',
    require('../router/user'));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/OurCircle/user', require('../router/user'));

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

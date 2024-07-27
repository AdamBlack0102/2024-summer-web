const {Sequelize, sequelize} = require('../init');

const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
})

User.sync().then(() => {
    console.log('users表已经同步.');
})

module.exports = User
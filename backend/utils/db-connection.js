const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'product_app',
    'root',
    'ENTER YOUR MYSQL PASSWORD HERE',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to the database has been created");
    } catch (error) {
        console.log(error.message);
    }
})();

module.exports = sequelize;
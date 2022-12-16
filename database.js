const { DataSource } =require('typeorm');
require("dotenv").config();
const {student_credentials} = require('./entity/student')
const dataSource = new DataSource({
    type : process.env.name,
    host : process.env.host,
    port : process.env.Default_port,
    username : process.env.username,
    password : process.env.password,
    database : process.env.databaseName,
    entities : [student_credentials],
    migrations :['migrations/*.js'],
    migrationsTableName : 'postgres_migrations',
    cli:{
        entitiesDir:[student_credentials]
    },
    synchronize :true,

})
module.exports = { dataSource }

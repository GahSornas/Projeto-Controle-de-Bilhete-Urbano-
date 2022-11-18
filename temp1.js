const oracledb = require('oracledb')
const uwu = require('./dbInsert')


const dbCredentials = {
    user: 'PI',
    password: '123456',
    connectString: 'localhost:1521/xe'
}

uwu.run(dbCredentials,7404)
.then(res => console.log(res))
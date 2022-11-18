import oracledb  from "oracledb"

// const dbCredentials = {
//   user: 'PI',
//   password: '123456',
//   connectString: 'localhost:1521/xe'
// }

async function seeID(dbConfig,ID) {

  let connection;

  try {
    // Get a non-pooled connection

    connection = await oracledb.getConnection(dbConfig);


    const result = await connection.execute(
      // The statement to execute
      `SELECT * from bilhete where id_bilhete = ${ID}`,
      );
    
    return [id = result.rows[0][0],time = result.rows[0][1]];
    

    // console.log(result.metaData); // [ { name: 'FARMER' }, { name: 'PICKED' }, { name: 'RIPENESS' } ]
    // console.log(result.rows);     // [ [ 'Mindy', 2019-07-16T03:30:00.000Z, 'More Yellow than Green' ] ]
    // console.log(result.rows[0][1])

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}





// seeID(dbCredentials,7404)
// .then(res => console.log(res))

module.exports = {seeID}
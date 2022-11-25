const oracledb = require('oracledb');


function generateID(){
    ID = Math.floor(Math.random() * 100000) + 1;
    //console.log("ID generated: ");
    return ID;
  }

async function seeID(dbConfig,ID) {

    let connection;
  
    try {
      // Get a non-pooled connection
  
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(
        `select DATA_HORA_RECARGA from recarga where FK_BILHETE_id_bilhete = ${ID}`,
        );
      
        console.log(result)
      return [result.rows[0]];
  
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




  async function run(dbCredentials) {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbCredentials); 
      console.log("Successfully connected to Oracle Database");
        ID = generateID()

        await connection.execute(`insert into BILHETE values (${ID},current_timestamp)`);
        connection.commit();
        return ID;
    //  async function insertDB(ID){
    //    try{
    //      await connection.execute(`insert into BILHETE values (${ID},current_timestamp)`);
    //    }catch (err){
    //      console.log(err);
    //      ID = generateID();e
    //      insertDB(ID)
    //    } 
    //  }
 
    } catch (err) {
      console.error(err);
      run(dbCredentials)
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





  async function insertRecarga(dbConfig,ID,kindID) {

    let connection;
  
    try {
      id_recarga = generateID();  
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(`insert into RECARGA values (${id_recarga},current_timestamp,${ID},'${kindID}')`);
      //select = await connection.execute(`select * from recarga where FK_BILHETE_id_bilhete = ${ID}`);
      connection.commit();
      console.log("generated recarga")
    } catch (err) {
        //insertRecarga(dbConfig,id_recarga,ID,kindID);
        console.log(`parameters:${kindID}`)
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

module.exports = {insertRecarga,run,seeID}
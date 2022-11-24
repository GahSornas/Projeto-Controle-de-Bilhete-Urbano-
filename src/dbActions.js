const { uwu } = require("../test/import");

async function seeID(dbConfig,ID) {

    let connection;
  
    try {
      // Get a non-pooled connection
  
      connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(
        `SELECT * from bilhete where id_bilhete = ${ID}`,
        );
  
      return [result.rows[0][0],result.rows[0][1]];
  
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




  async function run(ID) {

    let connection;
  
    try {
      connection = await oracledb.getConnection(dbCredentials);
  
      console.log("Successfully connected to Oracle Database");
       /*TESTE*///ID = 1;
 
     async function insertDB(ID){
       try{
         await connection.execute(`insert into BILHETE values (${ID},current_timestamp)`);
       }catch (err){
         console.log(err);
         ID = generateID();
         insertDB(ID)
       } 
     }
 
     console.log(ID);
     insertDB(ID);
      // Insert some data
 
 
      connection.commit();
 
  
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





  async function insertRecarga(dbConfig,id_recarga,ID,kindID) {

    let connection;
  
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(`insert into RECARGA values (${id_recarga},current_timestamp,${ID},'${kindID}')`);
      select = await connection.execute(`select * from recarga where FK_BILHETE_id_bilhete = ${ID}`);
      connection.commit();
      console.log("generated recarga")
      return select;
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

module.exports = {insertRecarga,run,seeID}
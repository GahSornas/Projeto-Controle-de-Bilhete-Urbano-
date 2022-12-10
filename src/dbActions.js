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
        `SELECT tipo_bilhete, data_hora_utilizacao FROM RECARGA 
        JOIN UTILIZACAO ON id_recarga=FK_RECARGA_id_recarga
        JOIN BILHETE ON id_bilhete=FK_BILHETE_id_bilhete
        WHERE bilhete.id_bilhete=${ID}`,
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





  async function insertRecarga(dbConfig,ID,kindID,creditos) {

    let connection;
  
    try {
      id_recarga = generateID();  
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute(`insert into RECARGA values (${id_recarga},${ID},'${kindID}',${creditos},current_timestamp)`);
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

  async function seeUtilize(dbConfig,ID) {

    let connection;
  
    try {  
      connection = await oracledb.getConnection(dbConfig);
      const res = await connection.execute(`select * from recarga where FK_BILHETE_id_bilhete=${ID}`);
      const res1 = await connection.execute(`select FK_RECARGA_ID_RECARGA,tipo_bilhete,data_hora_utilizacao from RECARGA
      join UTILIZACAO on id_recarga=FK_RECARGA_id_recarga where FK_BILHETE_id_bilhete=${ID}`);
      const currentTime = await connection.execute(` 
      SELECT systimestamp AS time FROM dual
      `)
      //console.log(res1)
      connection.commit();
      // console.log(res.rows)
      // console.log(res1.rows);
      // console.log(currentTime.rows);
      return [res.rows,res1.rows,currentTime.rows]
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
module.exports = {insertRecarga,run,seeID,seeUtilize}
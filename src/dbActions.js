const oracledb = require('oracledb');
const moment = require('moment');
moment().format(); 


function generateID(){
    ID = Math.floor(Math.random() * 100000) + 1;
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
      
        // console.log(result)
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
  async function insertUtilize(dbConfig,FK_RECARGA_id_recarga){

    let connection;
  
    try {
      // Get a non-pooled connection
  
      connection = await oracledb.getConnection(dbConfig);
      console.log('utilize %d',FK_RECARGA_id_recarga)
      
      let currentTime = await connection.execute(` SELECT systimestamp AS time FROM dual`);
      
      currentTime = moment(currentTime.rows[0][0])

      // let latestUse = await connection.execute(`select DATA_HORA_UTILIZACAO where FK_RECARGA_ID_RECARGA `);
      
      let utilizacaoTime = 
      await connection.execute
      (
        `INSERT INTO UTILIZACAO VALUES
        (${generateID()}, ${FK_RECARGA_id_recarga}, current_timestamp)`
      ); 
      let tipo_bilhete = await connection.execute(`select tipo_bilhete from recarga where ID_RECARGA= ${FK_RECARGA_id_recarga}

      `)
      console.log(tipo_bilhete.rows[0][0]);
      if(tipo_bilhete.rows[0][0]!=='duplo')
      {
        try{
          
        }catch{

        }
      }
      await connection.execute
      (
        `UPDATE RECARGA SET creditos=(creditos-1) WHERE id_recarga=${FK_RECARGA_id_recarga}`
      ); 
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




  async function run(dbCredentials) {
    let connection;
  
    try {
      connection = await oracledb.getConnection(dbCredentials); 
      console.log("Successfully connected to Oracle Database");
        ID = generateID()

        await connection.execute(`insert into BILHETE values (${ID},current_timestamp)`);
        connection.commit();
        return ID;
              
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
      const currentTime = await connection.execute(
        ` 
      SELECT systimestamp AS time FROM dual
      `)
      connection.commit();
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


  async function report(dbConfig,FK_BILHETE_id_bilhete) {

    let connection;
  
    try {  
      connection = await oracledb.getConnection(dbConfig);
      // let res = await connection.execute(`select data_hora_geracao, tipo_bilhete, data_hora_recarga, data_hora_utilizacao from BILHETE
      // JOIN RECARGA on id_bilhete=FK_BILHETE_id_bilhete
      // JOIN UTILIZACAO on id_recarga=FK_RECARGA_id_recarga WHERE FK_BILHETE_id_bilhete=${FK_BILHETE_id_bilhete}`);
      let res = await connection.execute(`select data_hora_geracao from BILHETE where id_bilhete=${FK_BILHETE_id_bilhete}`)
      // console.log("RES:")
      // console.log(res.rows)
      let res1 = await connection.execute(`select tipo_bilhete, data_hora_recarga, ID_RECARGA from RECARGA where FK_BILHETE_id_bilhete=${FK_BILHETE_id_bilhete}`)
      // console.log("RES1")
      // console.log(res1.rows)
      let res2;
      let res3 = [];
      for(let i in res1.rows)
      {
        res2 =  await connection.execute(`select data_hora_utilizacao, tipo_bilhete from UTILIZACAO
        join RECARGA on FK_RECARGA_id_recarga=id_recarga
        join BILHETE on FK_BILHETE_id_bilhete=id_bilhete
        where FK_BILHETE_id_bilhete=${FK_BILHETE_id_bilhete} and tipo_bilhete='${res1.rows[i][0]}'`)
        // console.log("RES2")
        // console.log(res2.rows);
        res3.push(res2.rows);
      }


      // console.log("RES 3")
      // console.log(res3);
      connection.commit();
      return[res.rows,res1.rows,res3];  
    }
     catch (err) {
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


module.exports = {insertRecarga,run,seeID,seeUtilize,insertUtilize,report}
const oracledb = require('oracledb');

const mypw = system // the hr schema password

function getEmployee(empid) {
  return new Promise(async function(resolve, reject) {
    let connection;

    try {
      connection = await oracledb.getConnection({
        user          : "hr",
        password      : mypw,
        connectString : "localhost/XEPDB1"
      });

      const result = await connection.execute(
        `SELECT * FROM employees WHERE employee_id = :bv`,
        [empid]
      );
      resolve(result.rows);

    } catch (err) { // catches errors in getConnection and the query
      reject(err);
    } finally {
      if (connection) {   // the connection assignment worked, must release
        try {
          await connection.release();
        } catch (e) {
          console.error(e);
        }
      }
    }
  });
}

async function run() {
  try {
    const res = await getEmployee(101);
    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

run();

import mysql from "mysql2/promise";

// PARTE PROIBIDA DE MEXER $-$ obs: ajustar depois, adicionar um .env

const db = mysql.createPool({
  host: "sql.freedb.tech",
  user: "freedb_mic4el",
  password: "rC74pC#m8S5#RC!",
  database: "freedb_Coffee404",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default db;

/*
                                 _______
     ___________________________.'.------`
    '---------------------------.'
      `.                      .'
    .-//`.                  .'
 .' .//.'/`================'
=[=:====:=]=           \\||
 '. `--' .'             \_|
   `-  -'
   
*/

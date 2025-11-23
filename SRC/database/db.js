import mysql from "mysql2";

// PARTE PROIBIDA DE MEXER $-$ obs: ajustar depois, adicionar um .env
const db = mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_mic4el",
  password: "rC74pC#m8S5#RC!",
  database: "freedb_Coffee404",
});

export default db;

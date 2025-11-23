import db from "../database/db.js";

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db
      .promise()
      .query("SELECT id, nome, email, senha FROM usuarios WHERE email = ?", [
        email,
      ]);

    if (rows.length === 0) {
      return res.status(401).send("Credenciais inválidas.");
    }

    const user = rows[0];

    if (user.senha === password) {
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/menu");
    }

    return res.status(401).send("Credenciais inválidas.");
  } catch (err) {
    console.error("Erro ao autenticar o usuário:", err);
    return res.status(500).send("Erro no servidor.");
  }
};

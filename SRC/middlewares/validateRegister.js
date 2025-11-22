export default function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .send("Campos 'name', 'email' e 'password' são obrigatórios.");
  }
  next();
}

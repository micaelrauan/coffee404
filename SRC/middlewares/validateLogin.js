export default function validateLogin(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send("Campos 'email' e 'password' são obrigatórios.");
  }
  next();
}

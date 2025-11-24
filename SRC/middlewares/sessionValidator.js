import jwt from "jsonwebtoken";
const SECRET = "mic4elr4auansecrettoken";

export default function sessionValidator(req, res, next) {
  const token = req.cookies.auth_token;
  if (!token) return res.redirect("/login");
  try {
    const user = jwt.verify(token, SECRET);
    req.user = user;
    next();
  } catch {
    return res.redirect("/login");
  }
}

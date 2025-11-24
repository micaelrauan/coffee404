import jwt from "jsonwebtoken";
const SECRET = "mic4elr4auansecrettoken";

export default function publicOnly(req, res, next) {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      jwt.verify(token, SECRET);
      return res.redirect("/menu");
    } catch (err) {
      res.clearCookie("auth_token");
      return next();
    }
  }
  return next();
}

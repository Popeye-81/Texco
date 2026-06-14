import jwt from "jsonwebtoken";

const SECRET = "texco_secret_key";

export function verifyToken(req) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, SECRET);

    return decoded; // { username, role }
  } catch (err) {
    return null;
  }
}
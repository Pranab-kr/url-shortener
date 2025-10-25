import { jwtVerifyToken } from "../utils/jwtToken.js ";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return next();
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(400)
      .json({ error: "auth header must start with Bearer " });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwtVerifyToken(token);

  req.user = decoded;
  return next();
};

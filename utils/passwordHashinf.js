import { randomBytes, createHmac } from "crypto";

export const passwordHashing = (password) => {
 const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
  return { hashedPassword, salt };
};

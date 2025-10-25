import JWT from "jsonwebtoken";
import { tokenVAlidationSchema } from "../validations/token.validation.js";

export const jwtSignToken = async (payload) => {
  const validationResult = await tokenVAlidationSchema.safeParseAsync(payload);

  if (validationResult.error) {
    throw new Error(validationResult.error.format());
  }

  const payloadValidData = validationResult.data;

  const token = JWT.sign(payloadValidData, process.env.JWT_SECRET);

  return token;
};

export const jwtVerifyToken = async (token) => {
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

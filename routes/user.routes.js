import express from "express";
import { db } from "../db/index.js";
import { usersTable } from "../models/index.js";
import {
  signupPostRequestSchema,
  loginPostRequestSchema,
} from "../validations/signup.validation.js";
import { passwordHashing } from "../utils/passwordHashinf.js";
import { getUserByEmail } from "../services/user.service.js";
import { createUser } from "../services/user.service.js";
import { jwtSignToken } from "../utils/jwtToken.js";


const router = express.Router();

router.post("/signup", async (req, res) => {
  // const { firstname, lastname, email, password } = req.body;

  const validationResult = await signupPostRequestSchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const { hashedPassword, salt } = passwordHashing(password);

  const user = await createUser(
    firstname,
    lastname,
    email,
    hashedPassword,
    salt
  );

  res.status(201).json({ message: `Userid: ${user.id} created successfully` });
});

router.post("/login", async (req, res) => {
  const validationResult = await loginPostRequestSchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return res.status(404).json({ error: "Invalid email or password" });
  }

  const { hashedPassword } = passwordHashing(password, existingUser.salt);

  if (hashedPassword !== existingUser.password) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = await jwtSignToken({ id: existingUser.id, email: existingUser.email });

  return res.status(200).json({ token });
});

export default router;

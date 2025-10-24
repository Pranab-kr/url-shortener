import express from "express";
import { db } from "../db/index.js";
import { usersTable } from "../models/index.js";
import { signupPostRequestSchema } from "../validations/signup.validation.js";
import { passwordHashing } from "../utils/passwordHashinf.js";
import { getUserByEmail } from "../services/user.service.js";
import { createUser } from "../services/user.service.js";

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

export default router;

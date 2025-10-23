import express from "express";
import signup from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "server is up and running" });
});

app.use("/user", signup);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

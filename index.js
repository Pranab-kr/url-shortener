import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8000;


app.get("/", (req, res) => {
  res.json({ status: "server is up and running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

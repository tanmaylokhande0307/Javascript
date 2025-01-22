import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const client = createClient();

app.post("/submit", async (req, res) => {
  const { problemId, userId, code, language } = req.body;
  try {
    await client.lPush(
      "submissions",
      JSON.stringify({ problemId, userId, code, language })
    );
    res.json({
      message: "submission received",
    });
  } catch (error) {
    res.json({
      message: "submission failed",
    });
  }
});

const startServer = async () => {
  try {
    await client.connect();

    app.listen(3000, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log("server crashed");
  }
};

startServer()

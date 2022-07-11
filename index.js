import "dotenv/config";
import express from "express";
import webhookRouter from "./routes/webhook.js";
const app = express();

app.use(express.json());

app.use(webhookRouter);

app.get("/", (_req, res) => {
    res.send("Hola");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

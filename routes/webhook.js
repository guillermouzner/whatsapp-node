import { Router } from "express";

const router = Router();

router.get("/webhook", (_req, res) => {
    return res.json({ guillermo: "guillermo" });
});

router.post("/webhook", (req, res) => {
    res.send("webhook post");
});

export default router;

import { Router } from "express";
import {
    verifyToken,
    sendReceiveMessages,
} from "../controllers/webhook.controller.js";

const router = Router();

router.get("/webhook", verifyToken);

router.post("/webhook", sendReceiveMessages);

export default router;

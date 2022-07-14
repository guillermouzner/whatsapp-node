import { Router } from "express";
import {
    verifyToken,
    sendReceiveMessages,
} from "../controllers/webhook.controller.js";

import { dataMessage } from "../middlewares/dataMessage.js";

const router = Router();

router.get("/webhook", verifyToken);

router.post("/webhook", dataMessage, sendReceiveMessages);

export default router;

import { Router } from "express";
import {
    verifyToken,
    sendReceiveMessages,
} from "../controllers/webhook.controller.js";

import { prueba } from "../middlewares/dataMessage.js";
import { textMessage } from "../utils/messagesFunction.js";

const router = Router();

router.get("/webhook", verifyToken);

router.post("/webhook", prueba, textMessage);

export default router;

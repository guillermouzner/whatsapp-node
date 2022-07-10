import { Router } from "express";
import axios from "axios";
const router = Router();
import { createBot } from 'whatsapp-cloud-api';

const fromGit  = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID
const token = process.env.WHATSAPP_TOKEN;
const webhookVerifyToken = process.env.VERIFY_TOKEN

router.get("/webhook", (req, res) => {
    /**
     * UPDATE YOUR VERIFY TOKEN
     *This will be the Verify Token value when you set up webhook
     **/
    const verify_token = process.env.VERIFY_TOKEN;

    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode were sent
    if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === verify_token) {
            // Respond with 200 OK and challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

router.post("/webhook", (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the Incoming webhook message
    console.log(JSON.stringify(req.body, null, 2));

    if (req.body.object) {
        if (
          req.body.entry &&
          req.body.entry[0].changes &&
          req.body.entry[0].changes[0] &&
          req.body.entry[0].changes[0].value.messages &&
          req.body.entry[0].changes[0].value.messages[0]
        ) {
          let phone_number_id =
            req.body.entry[0].changes[0].value.metadata.phone_number_id;
          let to = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
          let msg_body = req.body.entry[0].changes[0].value.messages[0].text.body

          const bot = createBot(fromGit, token);

          const result = await bot.sendMessage(to, 'Hello world');

        }
    }
});

export default router;

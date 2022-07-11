import { Router, text } from "express";
import axios from "axios";
const router = Router();

const token = process.env.WHATSAPP_TOKEN;

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

    //info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
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
            let from = req.body.entry[0].changes[0].value.messages[0].from; // extract the phone number from the webhook payload
            let msg_body =
                req.body.entry[0].changes[0].value.messages[0].text.body; // extract the message text from the webhook payload

            var data = {
                messaging_product: "whatsapp",
                to: from,
                type: "text",
                text: {
                    preview_url: false,
                    body: "Ack: " + msg_body,
                },
            };
            var config = {
                method: "post",
                url: `https://graph.facebook.com/v13.0/${phone_number_id}/messages`,
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer EAAKWn8YlQfoBACaohLQqi8gc9LaULkn6oc7Op7ZB3WJVs6AKQMrZB2a8OvyvYA4fmEsNUCZC6FpWaOv7gdHrXGeU7x1S8Cxxjill6sGq9Xtj4TaAO5fxvSKpvFg7ZAvQ8uff89coZBK1oA3Xk71lsYhtZAy7eH0i70l7QAEzENDZCP0NbHGiuaRMZB5q5jmAbbTXkhl8AHOdAI6xD3kWZBJb3`,
                },
                data: data,
            };
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        res.sendStatus(200);
    } else {
        // Return a '404 Not Found' if event is not from a WhatsApp API
        res.sendStatus(404);
    }
});

export default router;

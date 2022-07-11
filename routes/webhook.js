import { Router } from "express";
import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
const router = Router();

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

const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.accessToken,
    senderPhoneNumberId: process.env.senderPhoneNumberId,
    WABA_ID: process.env.WABA_ID,
});

router.post("/webhook", async (req, res) => {
    try {
        let data = Whatsapp.parseMessage(req.body);
        console.log(data);
        if (data?.isMessage) {
            let incomingMessage = data.message;
            let recipientPhone = incomingMessage.from.phone; // extract the phone number of the customer
            let recipientName = incomingMessage.from.name; // extract the name of the customer
            let typeOfMsg = incomingMessage.type; // extract the type of message
            let message_id = incomingMessage.message_id; // extract the message id

            if (typeOfMsg === "simple_button_message") {
                let button_id = incomingMessage.button_reply.id;
                if (button_id === "book_appointment") {
                    // The customer clicked on a simple button whose id is 'book_appointment'.
                    // You can respond to them with an outbound action eg, a text message
                    await Whatsapp.sendText({
                        message: `Hello customer, You clicked on the 'book appointment' button`,
                        recipientPhone: recipientPhone,
                    });
                }
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

export default router;

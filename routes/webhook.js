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
            // let text = incomingMessage.text.body;
            // let text = incomingMessage.button_reply.id;
            console.log(recipientPhone, recipientName, typeOfMsg, message_id);
            // if (typeOfMsg === "text_message") {
            //     // let button_id = incomingMessage.button_reply.id;
            //     // if (button_id === "book_appointment") {
            //     //     // The customer clicked on a simple button whose id is 'book_appointment'.
            //     //     // You can respond to them with an outbound action eg, a text message

            //     // }
            //     await Whatsapp.sendText({
            //         message: `Hello customer, You clicked on the 'book appointment' button`,
            //         recipientPhone: recipientPhone,
            //     });
            // }
            await Whatsapp.markMessageAsRead({
                message_id: message_id,
            });

            // if (typeOfMsg === "text_message") {
            // await Whatsapp.sendText({
            //         message: text,
            //         recipientPhone: 543814987351,
            //     });
            // }

            if (typeOfMsg === "text_message") {
                await Whatsapp.sendSimpleButtons({
                    recipientPhone: 543814987351,
                    message: `How may I help you today`,
                    listOfButtons: [
                        {
                            title: "See some products",
                            id: "see_categories",
                        },
                        {
                            title: "Send my invoice",
                            id: "print_invoice",
                        },
                        {
                            title: "Talk to a human",
                            id: "talk_to_human",
                        },
                    ],
                });
            }

            if (
                typeOfMsg === "simple_button_message" &&
                incomingMessage.button_reply.id === "see_categories"
            ) {
                await Whatsapp.sendRadioButtons({
                    recipientPhone: 543814987351,
                    headerText: "Black Friday Top 10 Products",
                    bodyText:
                        "Daggie has some great products lined up for you based on your previous shopping history.\nPlease select one of the products below.",
                    footerText: "Approved by Daggie Blanqx",
                    listOfSections: [
                        {
                            title: "Top 3 Fashion",
                            rows: [
                                {
                                    title: "Black LVX T-Shirt",
                                    description:
                                        "KES 2999.00\nLVX is a warm cotton t-shirt",
                                    id: "SKU12_black_lvx_tshirt",
                                },
                                {
                                    title: "Purple hoodie",
                                    description:
                                        "KES 1999.00\nPurple hoodie with a Logrocket logo",
                                    id: "SKU13_purple_hoodie",
                                },
                                {
                                    title: "Air Jordan 1",
                                    description:
                                        "KES 10999.00\nWe move where others do not.Wanna fly?",
                                    id: "SKU14_air_jordan_1",
                                },
                            ],
                        },
                        {
                            title: "Top 3 Gadgets",
                            rows: [
                                {
                                    title: "Apple Watch",
                                    description:
                                        "KES 75999.00\nTime is finite, enjoy every second of it",
                                    id: "SKU15_apple_watch",
                                },
                                {
                                    title: "Surface Pro",
                                    description: `KES 59999.00\nDon't just surf the web, surf the world`,
                                    id: "SKU16_surface_pro",
                                },
                                {
                                    title: "Xiaomi Beats Speaker",
                                    description: `KES 45699\nIt is in how your heartbeats, the way Xiaomi Beats.`,
                                    id: "SKU17_xiaomi_beats_speaker",
                                },
                            ],
                        },
                        {
                            title: "Top 3 Kitchen",
                            rows: [
                                {
                                    title: "Portable Hand Mixer",
                                    description: `KES7899\nTempt thy sweetbuds by mixing your favorite food uniformly.`,
                                    id: "SKU18_portable_hand_mixer",
                                },
                                {
                                    title: "Non-stick waffle-maker",
                                    description: `KES7899\nGreat Waffles are made with the best ingredients.`,
                                    id: "SKU19_non_stick_waffle_maker",
                                },
                                {
                                    title: "6-set Cooking Spoons",
                                    description: `KES7899\nHold thy happiness right.`,
                                    id: "SKU20_6_set_cooking_spoons",
                                },
                            ],
                        },
                        {
                            title: "1 random pick",
                            rows: [
                                {
                                    title: "Nivea Icy Soap",
                                    description: `KES899\nStay hydrated and refreshed. Nourish your skin.`,
                                    id: "SKU21_nivea_icy_soap",
                                },
                            ],
                        },
                    ],
                });
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

export default router;

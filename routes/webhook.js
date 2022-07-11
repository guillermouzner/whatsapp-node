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
                    message: `Hola soy Santi, tu asistente virtual en Santander! 🤖`,
                    listOfButtons: [
                        {
                            title: "Mostrar Opciones",
                            id: "see_categories",
                        },
                        {
                            title: "Hablar con un humano",
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
                    headerText: "¿En qué puedo ayudarte? 👇",
                    bodyText:
                        "1. Operar Activos (Compra, Venta, Sucripciones a FCI) 💣\n2. Comprar/ Vender Dólar MEP\n3. Transferir fondos a mi banco (Nuevo)\n4. Convertir dólar CABLE en dólar MEP\n5. Abrir una cuenta en Cocos 🥥\n6. Hacer una consulta\n7. Cerrar mi cuenta en Cocos 🥥\n\n📈 Cotización indicativa Dólar MEP (mediante Bonos):\n\nVenta: AR$ 279 / Compra: AR$ 285\n",
                    footerText:
                        "Selecciona una de las opciones para continuar:",
                    listOfSections: [
                        {
                            title: "Selecciona una opcion",
                            rows: [
                                {
                                    title: "Operar activos",
                                    description: "1",
                                    id: "operar_activos",
                                },
                                {
                                    title: "Operar Dolar MEP",
                                    description: "2",
                                    id: "Operar_Dolar_MEP",
                                },
                                {
                                    title: "Transferir a Banco",
                                    description: "3",
                                    id: "Transferir_a_Banco",
                                },
                                {
                                    title: "Convertir Cable-Mep",
                                    description: "4",
                                    id: "Convertir_Cable-Mep",
                                },
                                {
                                    title: "Abrir cuenta Cocos",
                                    description: "5",
                                    id: "Abrir_cuenta_Cocos",
                                },
                                {
                                    title: "Consultar",
                                    description: "6",
                                    id: "consultar",
                                },
                                {
                                    title: "Cerrar cuenta",
                                    description: "7",
                                    id: "cerrar_cuenta",
                                },
                            ],
                        },
                    ],
                });
            }

            if (
                typeOfMsg === "radio_button_message" &&
                incomingMessage.list_reply.description === "1"
            ) {
                await Whatsapp.sendContact({
                    recipientPhone: 543814987351,
                    contact_profile: {
                        addresses: [
                            {
                                street: "1 Hacker Way",
                                city: "Menlo Park",
                                state: "CA",
                                zip: "94025",
                                country: "United States",
                                country_code: "us",
                                type: "HOME",
                            },
                            {
                                street: "200 Jefferson Dr",
                                city: "Menlo Park",
                                state: "CA",
                                zip: "94025",
                                country: "United States",
                                country_code: "us",
                                type: "WORK",
                            },
                        ],
                        birthday: "2002-02-14",
                        emails: [
                            {
                                email: "test@fb.com",
                                type: "WORK",
                            },
                            {
                                email: "test@whatsapp.com",
                                type: "HOME",
                            },
                        ],
                        name: {
                            formatted_name: "Daggie Blanqx",
                            first_name: "Daggie",
                            last_name: "Blanqx",
                            middle_name: "M.",
                            suffix: "Sr",
                            prefix: "Sw Engr",
                        },
                        org: {
                            company: "WhatsApp",
                            department: "Design",
                            title: "Manager",
                        },
                        phones: [
                            {
                                phone: "+1 (940) 555-1234",
                                type: "HOME",
                                wa_id: "16505551234", // optional
                            },
                            {
                                phone: "+1 (650) 555-1234",
                                type: "WORK", // optional
                                wa_id: "16505551234", // optional
                            },
                        ],
                        urls: [
                            {
                                url: "https://www.facebook.com",
                                type: "WORK",
                            },
                            {
                                url: "https://www.whatsapp.com",
                                type: "HOME",
                            },
                        ],
                    },
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

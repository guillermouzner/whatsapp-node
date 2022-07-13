import { Router } from "express";
import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
import { verifyToken } from "../controllers/webhook.controller.js";
const router = Router();

router.get("/webhook", verifyToken);

const Whatsapp = new WhatsappCloudAPI({
    accessToken: process.env.accessToken,
    senderPhoneNumberId: process.env.senderPhoneNumberId,
    WABA_ID: process.env.WABA_ID,
});

let listaDeSesiones = [];
let datos = [];
router.post("/webhook", async (req, res) => {
    try {
        let data = Whatsapp.parseMessage(req.body);
        console.log(data);

        if (!data?.isMessage) {
            console.log("VAMO KENIAAAAAAAAAAAA");
            console.log(data.notificationMessage.id);
            console.log(datos);
        }

        if (data?.isMessage) {
            let incomingMessage = data.message;
            let recipientPhone = incomingMessage.from.phone; // extract the phone number of the customer
            let recipientName = incomingMessage.from.name; // extract the name of the customer
            let typeOfMsg = incomingMessage.type; // extract the type of message
            let message_id = incomingMessage.message_id; // extract the message id
            // let text = incomingMessage.text.body;
            // let text = incomingMessage.button_reply.id;
            console.log(recipientPhone, recipientName, typeOfMsg, message_id);
            console.log(datos);
            if (incomingMessage?.context)
                console.log("vengo de un mensaje reply_button");
            else console.log("soy solo un texto");

            await Whatsapp.markMessageAsRead({
                message_id: message_id,
            });

            if (typeOfMsg === "text_message") {
                let theTextMessage = incomingMessage.text.body;
                if (!isNaN(theTextMessage)) {
                    if (theTextMessage > 10) {
                        await Whatsapp.sendText({
                            message:
                                "No cuento con una respuesta exacta a tu consulta.\nSin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:\nHola",
                            recipientPhone: 543814987351,
                        });
                    }
                } else if (
                    theTextMessage !== "Hola" &&
                    theTextMessage !== "hola"
                ) {
                    {
                        await Whatsapp.sendText({
                            message:
                                "No cuento con una respuesta exacta a tu consulta.\nSin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:\nHola",
                            recipientPhone: 543814987351,
                        });
                    }
                } else {
                    await Whatsapp.sendText({
                        message: `Hola soy Santi, tu asistente virtual en Santander! 🤖`,
                        recipientPhone: 543814987351,
                    });
                    {
                        listaDeSesiones = [
                            {
                                title: "Selecciona una opcion",
                                rows: [
                                    {
                                        title: "operar activos",
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
                        ];
                        await Whatsapp.sendRadioButtons({
                            recipientPhone: 543814987351,
                            headerText: "¿En qué puedo ayudarte? 👇",
                            bodyText:
                                "1. Mostrar contacto de Guillermo💣\n2. Comprar/ Vender Dólar MEP\n3. Transferir fondos a mi banco (Nuevo)\n4. Convertir dólar CABLE en dólar MEP\n5. Abrir una cuenta en Santander\n6. Hacer una consulta\n7. Cerrar mi cuenta Santander\n\n📈 Cotización indicativa Dólar MEP (mediante Bonos):\n\nVenta: AR$ 279 / Compra: AR$ 285\n",
                            //Operar Activos (Compra, Venta, Sucripciones a FCI)
                            footerText:
                                "Selecciona una de las opciones para continuar:",
                            listOfSections: listaDeSesiones,
                        });
                        datos.push({ recipientPhone, listaDeSesiones });
                    }
                }
            }

            let estaElnumero = [];
            datos.forEach((item) => {
                if (item.recipientPhone === recipientPhone)
                    estaElnumero.push(recipientPhone);
            });

            if (
                (typeOfMsg === "radio_button_message" &&
                    incomingMessage.list_reply.description === "1") ||
                (typeOfMsg === "text_message" &&
                    estaElnumero.includes(recipientPhone) &&
                    incomingMessage.text.body === "1")
            ) {
                await Whatsapp.sendContact({
                    recipientPhone: 543814987351,
                    contact_profile: {
                        emails: [
                            {
                                email: "guillermouz16@gmail.com",
                                type: "Gmail",
                            },
                        ],
                        name: {
                            formatted_name: "Guillermo Uzner",
                            first_name: "Guillermo",
                            last_name: "Uzner",
                        },

                        phones: [
                            {
                                phone: "543814987351",
                                type: "Cel",
                                wa_id: "543814987351", // optional
                            },
                        ],
                    },
                });
                datos = datos.filter(
                    (item) => item.recipientPhone !== recipientPhone
                );
            }
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

export default router;

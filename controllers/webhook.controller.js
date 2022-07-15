import { Whatsapp } from "../utils/whatsappCloud.js";
import {
    textMessage,
    radioButtonMenuInicio,
    listaDeSesiones,
    datos,
} from "../utils/messagesFunction.js";

export const verifyToken = (req, res) => {
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
};

export const sendReceiveMessages = async (req, res) => {
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
                textMessage(incomingMessage.text.body, recipientPhone);
            }

            let estaElNumero = [];
            datos.forEach((item) => {
                if (item.recipientPhone === recipientPhone)
                    estaElNumero.push(recipientPhone, item.id);
            });

            if (
                (typeOfMsg === "radio_button_message" &&
                    estaElNumero[1] === "menuInicio") ||
                (typeOfMsg === "text_message" &&
                    estaElNumero.includes(recipientPhone) &&
                    estaElNumero[1] === "menuInicio")
            ) {
                let message =
                    typeOfMsg === "radio_button_message"
                        ? incomingMessage.list_reply.description
                        : incomingMessage.text.body;

                radioButtonMenuInicio(message, recipientPhone);
            }
        }

        // if (
        //     typeOfMsg === "simple_button_message" &&
        //     estaElNumero[1] === "comprarVenderUSDT" &&
        //     incomingMessage.button_reply.id === "comprar_usdt"
        // ) {
        //     await Whatsapp.sendText({
        //         message: "Ingrese la cantidad",
        //         recipientPhone: 543814987351,
        //     });
        // }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
};

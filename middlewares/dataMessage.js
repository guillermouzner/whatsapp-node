import { Whatsapp } from "../utils/whatsappCloud.js";

export const prueba = (req, res, next) => {
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
        }
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
};

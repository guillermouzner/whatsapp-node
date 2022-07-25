import { Whatsapp } from "../utils/whatsappCloud.js";
import {
    textMessage,
    radioButtonMenuInicio,
    replyButton,
    listaDeSesiones,
    datos,
    comprarVenderMEP,
    estaDeAcuerdo,
    replyButtonNoExiste,
    replyButtonAceptoTyC,
    textMessageEmail,
    createAccount,
    textMessageDNI,
    verificarEmail,
    verificarToken,
    existeDni,
    existeDniToken,
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
            console.log(data.notificationMessage.id);
            console.log(datos);
        }

        if (data?.isMessage) {
            let incomingMessage = data.message;
            let recipientPhone = incomingMessage.from.phone; // extract the phone number of the customer
            recipientPhone = recipientPhone.split("");
            if (recipientPhone[2] === "9") {
                recipientPhone.splice(2, 1);
            }
            recipientPhone = recipientPhone.join("");
            let typeOfMsg = incomingMessage.type; // extract the type of message
            let message_id = incomingMessage.message_id; // extract the message id
            //let recipientName = incomingMessage.from.name; // extract the name of the customer
            // let text = incomingMessage.text.body;
            // let text = incomingMessage.button_reply.id;
            //console.log(recipientPhone, recipientName, typeOfMsg, message_id);
            console.log(datos);
            console.log(createAccount);
            console.log(recipientPhone);
            if (incomingMessage?.context)
                console.log("reply_button: " + incomingMessage.list_reply.id);
            else console.log("texto: " + incomingMessage.text.body);

            await Whatsapp.markMessageAsRead({
                message_id: message_id,
            });

            let estaElNumero = [];
            datos.forEach((item) => {
                if (item.recipientPhone === recipientPhone)
                    estaElNumero.push(recipientPhone, item.id);
            });

            if (
                typeOfMsg === "text_message" &&
                !estaElNumero.includes(recipientPhone)
            ) {
                textMessage(incomingMessage.text.body, recipientPhone);
            }

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

            if (
                typeOfMsg === "simple_button_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "comprarVenderMEP"
            ) {
                replyButton(incomingMessage.button_reply.id, recipientPhone);
            }

            if (
                typeOfMsg === "text_message" &&
                estaElNumero.includes(recipientPhone) &&
                (estaElNumero[1] === "comprarMEP" ||
                    estaElNumero[1] === "venderMEP")
            ) {
                let compraVentaID = estaElNumero[1];
                comprarVenderMEP(
                    incomingMessage.text.body,
                    compraVentaID,
                    recipientPhone
                );
            }
            if (
                typeOfMsg === "simple_button_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "estaDeAcuerdo"
            ) {
                estaDeAcuerdo(incomingMessage.button_reply.id, recipientPhone);
            }
            ///crear cuenta primero debe aceptar terminos y condiciones
            if (
                typeOfMsg === "simple_button_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "noExiste"
            ) {
                replyButtonNoExiste(
                    incomingMessage.button_reply.id,
                    recipientPhone
                );
            }

            if (
                typeOfMsg === "simple_button_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "terminosYCondiciones"
            ) {
                replyButtonAceptoTyC(
                    incomingMessage.button_reply.id,
                    recipientPhone
                );
            }
            ///// YA ES CLIENTE PERO NO TIENE REGISTRADO EL CELULAR
            if (
                typeOfMsg === "text_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "yaEsClienteDNI"
            ) {
                existeDni(incomingMessage.text.body, recipientPhone);
            }

            //// COINCIDE DNI, DOBLE AUTENTICACION AHORA CON MAIL
            if (
                typeOfMsg === "text_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "verificarTokenYaEsCliente"
            ) {
                existeDniToken(incomingMessage.text.body, recipientPhone);
            }

            if (
                typeOfMsg === "text_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "nombreYapellido"
            ) {
                textMessageDNI(incomingMessage.text.body, recipientPhone);
            }
            if (
                typeOfMsg === "text_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "verificarDNI"
            ) {
                textMessageEmail(incomingMessage.text.body, recipientPhone);
            }
            if (
                typeOfMsg === "text_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "verificarEmail"
            ) {
                verificarEmail(incomingMessage.text.body, recipientPhone);
            }
            if (
                typeOfMsg === "text_message" &&
                estaElNumero.includes(recipientPhone) &&
                estaElNumero[1] === "verificarToken"
            ) {
                verificarToken(incomingMessage.text.body, recipientPhone);
            }
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
};

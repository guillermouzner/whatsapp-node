import { Whatsapp } from "../utils/whatsappCloud.js";

export const textMessage = async (incomingMessage) => {
    let listaDeSesiones = [];
    let theTextMessage = incomingMessage;
    if (!isNaN(theTextMessage)) {
        if (theTextMessage > 10) {
            await Whatsapp.sendText({
                message:
                    "No cuento con una respuesta exacta a tu consulta.\nSin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:\nHola",
                recipientPhone: 543814987351,
            });
        }
    } else if (theTextMessage !== "Hola" && theTextMessage !== "hola") {
        {
            await Whatsapp.sendText({
                message:
                    "No cuento con una respuesta exacta a tu consulta.\nSin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:\nHola",
                recipientPhone: 543814987351,
            });
        }
    } else {
        await Whatsapp.sendText({
            message: `🤖 Hola soy Santi, tu asistente virtual en Santander♨️`,
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
                footerText: "Selecciona una de las opciones para continuar:",
                listOfSections: listaDeSesiones,
            });
            datos.push({
                recipientPhone,
                listaDeSesiones,
                id: "menuInicio",
            });
        }
    }
};

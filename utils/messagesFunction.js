import { Whatsapp } from "../utils/whatsappCloud.js";
export let listaDeSesiones = [];
export let datos = [];

export const textMessage = async (incomingMessage, recipientPhone) => {
    let theTextMessage = incomingMessage;
    if (!isNaN(theTextMessage)) {
        if (theTextMessage > 10000) {
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
                            title: "Comprar USDT",
                            description: "2",
                            id: "Comprar_USDT",
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
                    "1. Mostrar contacto de Guillermo💣\n2. Comprar/ Vender Dolar MEP\n3. Transferir fondos a mi banco (Nuevo)\n4. Abrir una cuenta en Santander\n5. Hacer una consulta\n6. Cerrar mi cuenta Santander\n\n📈 Cotización indicativa Dólar MEP (mediante Bonos):\n\nVenta: AR$ 279 / Compra: AR$ 285\n",
                //Operar Activos (Compra, Venta, Sucripciones a FCI)
                footerText: "Ingresá el número de opción seleccionada:",
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

export const radioButtonMenuInicio = async (
    incomingMessage,
    recipientPhone
) => {
    if (incomingMessage === "1") {
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
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }

    if (incomingMessage === "2") {
        await Whatsapp.sendSimpleButtons({
            recipientPhone: 543814987351,
            message: `Selecciona la opcion que deseas hacer`,
            listOfButtons: [
                {
                    title: "COMPRAR USDT",
                    id: "comprar_usdt",
                },
                {
                    title: "VENDER USDT",
                    id: "vender_usdt",
                },
            ],
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "comprarVenderUSDT",
        });
    }

    if (incomingMessage === "5") {
        await Whatsapp.sendRadioButtons({
            recipientPhone: 543814987351,
            headerText: "¿En qué puedo ayudarte? 👇",
            bodyText:
                "1️⃣. Quiero empezar a cobrar mi sueldo u honorario en Santander\n2️⃣. Aumentar límite de Tarjeta de Crédito Santander\n3. ¿Qué es Getnet?\n4. Soy freelancer, ¿puedo acreditar mi orden de pago en dólares? \n5. Qué operaciones podés hacer sin turno\n6. Preguntas Frecuentes\n",
            footerText: "Ingresá el número de opción seleccionada:",
            listOfSections: listaDeSesiones,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);

        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "consultas",
        });
    }
};

export const replyButton = async (incomingMessage, recipientPhone) => {
    if (incomingMessage === "comprar_usdt") {
        await Whatsapp.sendText({
            message: "Ingrese la cantidad que desea comprar (en numeros)",
            recipientPhone: 543814987351,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "comprarUSDT",
        });
    }
    if (incomingMessage === "vender_usdt") {
        await Whatsapp.sendText({
            message: "Ingrese la cantidad que desea vender (en numeros)",
            recipientPhone: 543814987351,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "venderUSDT",
        });
    }
};

export const comprarVenderUSDT = async (
    incomingMessage,
    id,
    recipientPhone
) => {
    if (id === "comprarUSDT" && !isNaN(incomingMessage)) {
        await Whatsapp.sendText({
            message: `Su compra de ${incomingMessage} USDT se completo satisfactoriamente`,
            recipientPhone: 543814987351,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    } else if (id === "venderUSDT" && !isNaN(incomingMessage)) {
        await Whatsapp.sendText({
            message: `Su venta de ${incomingMessage} USDT se completo satisfactoriamente`,
            recipientPhone: 543814987351,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    } else {
        await Whatsapp.sendText({
            message: `Debe ingresar el monto en formato numero`,
            recipientPhone: 543814987351,
        });
    }
};

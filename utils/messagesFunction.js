import { nanoid } from "nanoid";
import { Whatsapp } from "../utils/whatsappCloud.js";
import { dolarMep } from "./precioDolarMep.js";
import { existeCel, existeCelDni, saldos } from "./existeCel.js";
export let listaDeSesiones = [];
export let datos = [];
export let createAccount = [];

export const textMessage = async (incomingMessage, recipientPhone) => {
    let theTextMessage = incomingMessage;
    if (!isNaN(theTextMessage)) {
        if (theTextMessage > 10000) {
            await Whatsapp.sendText({
                message:
                    "No cuento con una respuesta exacta a tu consulta.\nSin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:\nHola",
                recipientPhone: recipientPhone,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
        }
    } else if (theTextMessage !== "Hola" && theTextMessage !== "hola") {
        {
            await Whatsapp.sendText({
                message:
                    "No cuento con una respuesta exacta a tu consulta.\nSin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:\nHola",
                recipientPhone: recipientPhone,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
        }
    } else {
        await Whatsapp.sendText({
            message: `*[NO OFICIAL]*\n🤖 Hola soy Santi, tu asistente virtual en Santander♨️`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
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
            const { compra, venta } = await dolarMep();

            await Whatsapp.sendRadioButtons({
                recipientPhone: recipientPhone,
                headerText: "¿En qué puedo ayudarte? 👇",
                bodyText: `1️⃣. Comprar/ Vender Dolar MEP\n2️⃣. Recargar SUBE\n3️⃣. Pagar Servicios\n4️⃣. Abrir una cuenta en Santander\n5️⃣. Hacer una consulta\n6️⃣. Cerrar mi cuenta Santander\n\n📈 Cotización indicativa Dólar MEP (mediante Bonos):\n\nVenta: AR$ ${venta} / Compra: AR$ ${compra}\n`,
                //Operar Activos (Compra, Venta, Sucripciones a FCI)
                footerText: "Ingresá el número de opción seleccionada:",
                listOfSections: listaDeSesiones,
            });
            datos.push({
                recipientPhone,
                id: "menuInicio",
                // numeroDeIntentos: 1
            });
        }
    }
};

export const radioButtonMenuInicio = async (
    incomingMessage,
    recipientPhone
) => {
    const { existe } = await existeCel(recipientPhone);
    if (existe === "existeCel") {
        if (incomingMessage === "2" || incomingMessage === "3") {
            await Whatsapp.sendText({
                message: `🤖 Opcion no disponible momentaneamente ♨️`,
                recipientPhone: recipientPhone,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
        }

        if (incomingMessage === "1") {
            await Whatsapp.sendSimpleButtons({
                recipientPhone: recipientPhone,
                message: `Selecciona la opcion que deseas hacer`,
                listOfButtons: [
                    {
                        title: "COMPRAR Dolar Mep",
                        id: "comprar_usdt",
                    },
                    {
                        title: "VENDER Dolar Mep",
                        id: "vender_usdt",
                    },
                ],
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            datos.push({
                recipientPhone,
                listaDeSesiones,
                id: "comprarVenderUSDT",
            });
        }

        if (incomingMessage === "5") {
            await Whatsapp.sendRadioButtons({
                recipientPhone: recipientPhone,
                headerText: "¿En qué puedo ayudarte? 👇",
                bodyText:
                    "1️⃣. Quiero empezar a cobrar mi sueldo u honorario en Santander\n2️⃣. Aumentar límite de Tarjeta de Crédito Santander\n3️⃣. ¿Qué es Getnet?\n4️⃣. Soy freelancer, ¿puedo acreditar mi orden de pago en dólares? \n5️⃣. Cajeros cercanos\n6️⃣. Preguntas Frecuentes\n",
                footerText: "Ingresá el número de opción seleccionada:",
                listOfSections: listaDeSesiones,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );

            datos.push({
                recipientPhone,
                listaDeSesiones,
                id: "consultas",
            });
        }
    }
    if (existe === "noExiste") {
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        await Whatsapp.sendSimpleButtons({
            recipientPhone: recipientPhone,
            message: `Uy, todavía no sos cliente de Santander. Tener cuenta es necesario para operar dólar mep y pagar servicios.\n¿Querés abrirte una cuenta? Es gratis y te va a llevar sólo 5 minutos :)`,
            listOfButtons: [
                {
                    title: "Si",
                    id: "crearCuenta",
                },
                {
                    title: "No",
                    id: "salir",
                },
                {
                    title: "Ya soy cliente",
                    id: "soyCliente",
                },
            ],
        });
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "noExiste",
        });
    }
};

export const replyButton = async (incomingMessage, recipientPhone) => {
    const { compra, venta } = await dolarMep();
    if (incomingMessage === "comprar_usdt") {
        await Whatsapp.sendText({
            message: `El precio actual estimado es de $ ${compra}\n\nIngrese la cantidad de USD que desea comprar (en numeros):`,
            recipientPhone: recipientPhone,
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
            message: `El precio actual estimado es de $ ${venta}\n\nIngrese la cantidad de USD que desea vender (en numeros):`,
            recipientPhone: recipientPhone,
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
        const { compra } = await dolarMep();
        const { token, documento } = await existeCel(recipientPhone);
        const { pesos, dolares } = await saldos(token);
        let numeroDeCuenta = documento;
        let montoeEnPesos = compra * incomingMessage;
        await Whatsapp.sendText({
            message: `⚠ Vas a operar de tu cuenta Nº ${numeroDeCuenta}`,
            recipientPhone: recipientPhone,
        });
        await Whatsapp.sendText({
            message: `📄 Resumen de la operación:\n▫ Compra de Dólar Mep\n▫ Cotización indicativa: $ ${Intl.NumberFormat(
                "es-AR"
            ).format(
                compra
            )}\n▫ Número de cuenta: ${numeroDeCuenta}\n▫ Monto en pesos requerido: $ ${Intl.NumberFormat(
                "es-AR"
            ).format(
                montoeEnPesos
            )}\n▫ Dolares a recibir: U$D ${Intl.NumberFormat("es-AR").format(
                incomingMessage
            )}\n▫ Pesos: ${pesos}, Dolares: ${dolares}`,
            recipientPhone: recipientPhone,
        });

        await Whatsapp.sendSimpleButtons({
            recipientPhone: recipientPhone,
            message: `▫ ¿Estás de acuerdo?`,
            listOfButtons: [
                {
                    title: "✅ Si",
                    id: "esta_de_acuerdo",
                },
                {
                    title: "📝 Modificar monto",
                    id: "modifica_monto",
                },
                {
                    title: "❌ No. Cancelar",
                    id: "no_esta_de_acuerdo",
                },
            ],
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "estaDeAcuerdo",
        });
    } else if (id === "venderUSDT" && !isNaN(incomingMessage)) {
        const { venta } = await dolarMep();
        let numeroDeCuenta = 42121994;
        let montoeEnPesos = venta * incomingMessage;
        await Whatsapp.sendText({
            message: `⚠ Vas a operar de tu cuenta Nº ${numeroDeCuenta}`,
            recipientPhone: recipientPhone,
        });
        await Whatsapp.sendText({
            message: `📄 Resumen de la operación:\n▫ Venta de Dólar Mep\n▫ Cotización indicativa: $ ${Intl.NumberFormat(
                "es-AR"
            ).format(
                venta
            )}\n▫ Número de cuenta: ${numeroDeCuenta}\n▫ Monto en dolares requerido: U$D ${Intl.NumberFormat(
                "es-AR"
            ).format(
                incomingMessage
            )}\n▫ Pesos a recibir: $ ${Intl.NumberFormat("es-AR").format(
                montoeEnPesos
            )}`,
            recipientPhone: recipientPhone,
        });

        await Whatsapp.sendSimpleButtons({
            recipientPhone: recipientPhone,
            message: `▫ ¿Estás de acuerdo?`,
            listOfButtons: [
                {
                    title: "✅ Si",
                    id: "esta_de_acuerdo",
                },
                {
                    title: "📝 Modificar monto",
                    id: "modifica_monto",
                },
                {
                    title: "❌ No. Cancelar",
                    id: "no_esta_de_acuerdo",
                },
            ],
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "estaDeAcuerdo",
        });
    } else {
        await Whatsapp.sendText({
            message: `Debe ingresar el monto en formato numero`,
            recipientPhone: recipientPhone,
        });
    }
};

export const estaDeAcuerdo = async (incomingMessage, recipientPhone) => {
    if (incomingMessage === "esta_de_acuerdo") {
        await Whatsapp.sendText({
            message: `La solicitud finalizó correctamente 🤩\nYa podes ver la orden reflejada en nuestra app.`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }

    if (incomingMessage === "modifica_monto") {
        await Whatsapp.sendSimpleButtons({
            recipientPhone: recipientPhone,
            message: `Selecciona la opcion que deseas hacer`,
            listOfButtons: [
                {
                    title: "COMPRAR Dolar Mep",
                    id: "comprar_usdt",
                },
                {
                    title: "VENDER Dolar Mep",
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

    if (incomingMessage === "no_esta_de_acuerdo") {
        await Whatsapp.sendText({
            message: `Operacion cancelada.`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
};

export const replyButtonNoExiste = async (incomingMessage, recipientPhone) => {
    if (incomingMessage === "crearCuenta") {
        await Whatsapp.sendText({
            message:
                "Antes de comenzar, te pedimos que aceptes nuestros términos y condiciones:\n\n👉 https://www.santander.com.ar/banco/wcm/connect/23e5db12-42ef-4872-b9ed-b8b52e3fae9c/Terminos+y+Condiciones+App+Santander.pdf?MOD=AJPERES&CVID=nrtTxgR",
            recipientPhone: recipientPhone,
        });
        await Whatsapp.sendSimpleButtons({
            recipientPhone: recipientPhone,
            message: `¿Estás de acuerdo?`,
            listOfButtons: [
                {
                    title: "Si",
                    id: "siEstoyDeAcuerdo",
                },
                {
                    title: "No",
                    id: "noEstoyDeAcuerdo",
                },
            ],
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "terminosYCondiciones",
        });
    }
    if (incomingMessage === "salir") {
        await Whatsapp.sendText({
            message: "😃",
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    if (incomingMessage === "soyCliente") {
        await Whatsapp.sendText({
            message: "¿Cuál es tu número de DNI?",
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "yaEsClienteDNI",
        });
    }
};

export const existeDni = async (incomingMessage, recipientPhone) => {
    const { existe, email } = await existeCelDni(
        incomingMessage,
        recipientPhone
    );
    if (existe === "existeCel") {
        const tokenConfirm = nanoid(5);
        await Whatsapp.sendText({
            message: `📩 Te voy a mandar un código a tu mail (${email}). Si no lo recibís, recordá revisar el correo no deseado.\n\n¿Cuál es el código de verificación?\n\n(token: ${tokenConfirm})`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "verificarTokenYaEsCliente",
        });
        createAccount.push({
            recipientPhone: recipientPhone,
            numeroDeIntentos: 0,
            tokenConfirm: tokenConfirm,
        });
    } else {
        await Whatsapp.sendSimpleButtons({
            recipientPhone: recipientPhone,
            message: `Uy, todavía no sos cliente de Santander. Tener cuenta es necesario para operar dólar mep y pagar servicios.\n¿Querés abrirte una cuenta? Es gratis y te va a llevar sólo 5 minutos :)`,
            listOfButtons: [
                {
                    title: "Si",
                    id: "crearCuenta",
                },
                {
                    title: "No",
                    id: "salir",
                },
                {
                    title: "Ya soy cliente",
                    id: "soyCliente",
                },
            ],
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);

        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "noExiste",
        });
    }
};

export const existeDniToken = async (incomingMessage, recipientPhone) => {
    createAccount.forEach(async (item) => {
        if (
            item.recipientPhone === recipientPhone &&
            item.tokenConfirm === incomingMessage
        ) {
            await Whatsapp.sendText({
                message: `✅ El código ingresado es correcto.`,
                recipientPhone: recipientPhone,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );

            createAccount = createAccount.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            await textMessage("hola", recipientPhone);
        } else if (
            item.recipientPhone === recipientPhone &&
            item.numeroDeIntentos === 0
        ) {
            await Whatsapp.sendText({
                message: `❌ El código ingresado es incorrecto.`,
                recipientPhone: recipientPhone,
            });
            await Whatsapp.sendText({
                message: `Podras intentarlo una vez mas y en caso de error tendras que iniciar todo el proceso de nuevo.`,
                recipientPhone: recipientPhone,
            });
            item.numeroDeIntentos = 1;
        } else if (
            item.recipientPhone === recipientPhone &&
            item.numeroDeIntentos === 1
        ) {
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            createAccount = createAccount.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            await Whatsapp.sendText({
                message: `❌ El código ingresado es incorrecto.`,
                recipientPhone: recipientPhone,
            });
        }
    });
};

export const replyButtonAceptoTyC = async (incomingMessage, recipientPhone) => {
    datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    if (incomingMessage === "siEstoyDeAcuerdo") {
        await Whatsapp.sendText({
            message: "Decime por favor tu nombre y apellido:",
            recipientPhone: recipientPhone,
        });
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "nombreYapellido",
        });
    }
    if (incomingMessage === "noEstoyDeAcuerdo") {
        await Whatsapp.sendText({
            message: "😃",
            recipientPhone: recipientPhone,
        });
    }
};

export const textMessageDNI = async (incomingMessage, recipientPhone) => {
    createAccount.push({ recipientPhone: recipientPhone, numeroDeIntentos: 0 });
    createAccount.forEach((item) => {
        if (item.recipientPhone === recipientPhone) {
            Object.assign(item, { username: incomingMessage });
        }
    });
    await Whatsapp.sendText({
        message: "¿Cuál es tu número de DNI?",
        recipientPhone: recipientPhone,
    });
    datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    datos.push({
        recipientPhone,
        listaDeSesiones,
        id: "verificarDNI",
    });
};

export const textMessageEmail = async (incomingMessage, recipientPhone) => {
    const regexDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;

    if (regexDNI.test(incomingMessage)) {
        createAccount.forEach((item) => {
            if (item.recipientPhone === recipientPhone) {
                Object.assign(item, { documento: incomingMessage });
            }
        });
        await Whatsapp.sendText({
            message:
                "¿Me decís tu email? Recordá que con él vas a poder acceder a tu cuenta.",
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "verificarEmail",
        });
    } else {
        await Whatsapp.sendText({
            message: `Debe ingresar un DNI válido`,
            recipientPhone: recipientPhone,
        });
    }
};

export const verificarEmail = async (incomingMessage, recipientPhone) => {
    const regexEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexEmail.test(incomingMessage)) {
        createAccount.forEach((item) => {
            if (item.recipientPhone === recipientPhone) {
                Object.assign(item, { email: incomingMessage });
            }
        });
        const tokenConfirm = nanoid(5);
        await Whatsapp.sendText({
            message: `📩 Te voy a mandar un código a tu mail (${incomingMessage}). Si no lo recibís, recordá revisar el correo no deseado.\n\n¿Cuál es el código de verificación?\n\n(token: ${tokenConfirm})`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "verificarToken",
        });
        createAccount.forEach((item) => {
            if (item.recipientPhone === recipientPhone) {
                Object.assign(item, { tokenConfirm });
            }
        });
    } else {
        await Whatsapp.sendText({
            message: `Debe ingresar un email válido`,
            recipientPhone: recipientPhone,
        });
    }
};

export const verificarToken = async (incomingMessage, recipientPhone) => {
    createAccount.forEach(async (item) => {
        if (
            item.recipientPhone === recipientPhone &&
            item.tokenConfirm === incomingMessage
        ) {
            await Whatsapp.sendText({
                message: `✅ El código ingresado es correcto.`,
                recipientPhone: recipientPhone,
            });
            await Whatsapp.sendText({
                message: `Hola ${item.username}!👋🏼\n\n👀 Estamos revisando la info que nos pasaste, estate atento a tu mail (${item.email}) que pronto te avisaremos las novedades.`,
                recipientPhone: recipientPhone,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );

            createAccount = createAccount.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
        } else if (
            item.recipientPhone === recipientPhone &&
            item.numeroDeIntentos === 0
        ) {
            await Whatsapp.sendText({
                message: `❌ El código ingresado es incorrecto.`,
                recipientPhone: recipientPhone,
            });
            await Whatsapp.sendText({
                message: `Podras intentarlo una vez mas y en caso de error tendras que iniciar todo el proceso de nuevo.`,
                recipientPhone: recipientPhone,
            });
            item.numeroDeIntentos = 1;
        } else if (
            item.recipientPhone === recipientPhone &&
            item.numeroDeIntentos === 1
        ) {
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            createAccount = createAccount.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            await Whatsapp.sendText({
                message: `❌ El código ingresado es incorrecto.`,
                recipientPhone: recipientPhone,
            });
        }
    });
};

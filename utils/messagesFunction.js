import { nanoid } from "nanoid";
import { Whatsapp } from "../utils/whatsappCloud.js";
import { dolarMep } from "./precioDolarMep.js";
import { existeCel, existeCelDni, saldo, cerrarSesion } from "./existeCel.js";
import { compraVentaPesos, compraVentaDolares } from "./compraVenta.js";
export let listaDeSesiones = [];
export let datos = [];
export let createAccount = [];

export const textMessage = async (incomingMessage, recipientPhone) => {
    let theTextMessage = incomingMessage;
    if (
        !isNaN(theTextMessage) ||
        (theTextMessage !== "Hola" && theTextMessage !== "hola")
    ) {
        await Whatsapp.sendText({
            message:
                "_No cuento con una respuesta exacta a tu consulta._\n_Sin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:_\nHola",
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    // else if (theTextMessage !== "Hola" && theTextMessage !== "hola") {
    //     {
    //         await Whatsapp.sendText({
    //             message:
    //                 "No cuento con una respuesta exacta a tu consulta.\nSin embargo te puedo sugerir arrancar desde el Menu inicial poniendo:\nHola",
    //             recipientPhone: recipientPhone,
    //         });
    //         datos = datos.filter(
    //             (item) => item.recipientPhone !== recipientPhone
    //         );
    //     }
    // }
    else {
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
                            title: "Comprar/Vender Dolar MEP",
                            description: "1",
                            id: "operar_activos",
                        },
                        {
                            title: "Recargar SUBE",
                            description: "2",
                            id: "recarga_sube",
                        },
                        {
                            title: "Pagar Servicios",
                            description: "3",
                            id: "pagar_servicios",
                        },
                        {
                            title: "Abrir cuenta Santander",
                            description: "4",
                            id: "abrir_cuenta_santander",
                        },
                        {
                            title: "Hacer una consulta",
                            description: "5",
                            id: "consulta",
                        },
                        {
                            title: "Cerrar sesion",
                            description: "6",
                            id: "cerrar_sesion",
                        },
                    ],
                },
            ];
            const { compra, venta } = await dolarMep();
            // const compra = 315;
            // const venta = 310;

            await Whatsapp.sendRadioButtons({
                recipientPhone: recipientPhone,
                headerText: "¿En qué puedo ayudarte? 👇",
                bodyText: `1️⃣. Comprar/ Vender Dolar MEP\n2️⃣. Recargar SUBE\n3️⃣. Pagar Servicios\n4️⃣. Abrir una cuenta en Santander\n5️⃣. Hacer una consulta\n6️⃣. Cerrar sesion en este celular\n\n📈 Cotización indicativa Dólar MEP (mediante Bonos):\n\nVenta: AR$ ${venta} / Compra: AR$ ${compra}\n`,
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
export const radioButtonConsultas = async (incomingMessage, recipientPhone) => {
    if (incomingMessage === "1") {
        await Whatsapp.sendText({
            message: `*Si no tenés cuenta en el Banco*, podés sacar una en 3 simples pasos sin tener que acercarte a la sucursal, comenzas y finalizas el proceso en forma digital. Ingresá a www.santander.com.ar/banco/plan-sueldo para más información y seguí los pasos en "Si todavía no tenés cuenta en el Banco".\n\n*Si ya tenés cuenta en el Banco*, solo tenés que avisarle a tu empleador tu CBU para que comience a depositarte el sueldo en Santander.`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    if (incomingMessage === "2") {
        await Whatsapp.sendText({
            message: `Para solicitar una ampliación del límite de compra de tus tarjeta de crédito, tenés que acercarte a tu sucursal.\nVas a necesitar:\n▫ DNI\n▫ Comprobantes de ingresos\n▫ Y, según tu situación laboral, los tres últimos recibos de sueldo, tu comprobante de monotributo o Declaración Jurada de ganancias\n\nTené en cuenta que *la ampliación quedará sujeta a análisis*.\n¿Necesitas más límite para una situación especial? Tenés la opción de pedir una *ampliación transitoria* del 30% de tu límite actual para compras puntuales, acercándote a tu sucursal, con tu DNI.\nPara las compras con tarjeta de débito, tenés un límite fijo de $10.000 diarios.`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    if (incomingMessage === "3") {
        await Whatsapp.sendText({
            message: `Getnet es una plataforma abierta de cobros y servicios que brinda a comerciantes, emprendedores y profesionales una alternativa más *fácil, rápida y segura de cobrar*.\nCon Getnet podés realizar el cobro de tus ventas de forma presencial y a distancia, a través de diferentes medios de pago como tarjetas de crédito, tarjetas de débito, tarjetas prepagas y links de pago, en un solo pago o en cuotas.\nPara más información no dudes en escribir a somos@globalgetnet.com.ar.`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    if (incomingMessage === "4") {
        await Whatsapp.sendText({
            message: `A partir del 03/06/2022 si trabajas como freelancer (exportando servicios al exterior) vas a poder ingresar los cobros que recibas y acreditarlos en tu *cuenta en dólares* por los siguientes conceptos y descripciones:\n\n▫ Mantenimiento y reparaciones (S01)\n▫ Servicios de construcción (S07)\n▫ Servicios de telecomunicaciones (S12)\n▫ Servicios de informática (S13)\n▫ Servicios de información (S14)\n▫ Cargos por el uso de la propiedad intelectual (S15)\n▫ Servicios de investigación y desarrollo (S16)\n▫ Servicios jurídicos, contables y gerenciales (S17)\n▫ Servicios de publicidad, investigación de mercado y encuestas de opinión pública (S18)\n▫ Servicios arquitectónicos, de ingeniería y otros servicios técnicos (S19)\n▫ Servicios relacionados con el comercio (S21)\n▫ Otros servicios empresariales (S22)\n▫ Servicios audiovisuales y conexos (S23)\n▫ Otros servicios personales, culturales y recreativos -incluye enseñanzas educativas- (S24)\n▫ Otros servicios de salud (S27)\n\n*Tené en cuenta que para poder hacer uso de éste beneficio debés cumplir con los siguientes requisitos que establece la normativa:*\n\n▫ Podés usar este mecanismo por hasta *USD 12.000* en el año calendario en todas las entidades financieras. Los ingresos que excedan ese monto serán acreditados en pesos. Ej: si ingresás USD 13.000, solo USD 12.000 se podrán acreditar en dólares y el equivalente a USD 1000 se deberá acreditar en pesos.\n\n ▫ Los fondos deben ingresarse dentro de los 5 días hábiles contados desde su recepción en el exterior o en argentina, a una cuenta local en moneda extranjera a tu nombre. *Pasado el plazo de los 5 días hábiles no se podrá utilizar este mecanismo y deberás acreditar  en tu cuenta en pesos.*\n\n▫ Cuando cargues *la solicitud por Online Banking* estarás aceptando las siguientes *declaraciones juradas:*\n1. *No superaste el límite de los USD 12.000* anuales en todo el sistema financiero por los conceptos alcanzados.\n2. *No realizaste 90 días antes ni realizarás 90 días después compras de moneda extranjera* mediante la venta de títulos valores, o su canje, transferencia al exterior, o la adquisición en el país de títulos valores emitidos por no residentes (entre otros, dólar MEP o CCL).\n\n⚠ Desde el punto de fiscal esta operatoria no tributará impuestos.\n\nSi recibiste una orden de pago y querés acreditarla en tu cuenta, podés hacerlo desde Online Banking 👉 https://productos.santander.com.ar/personas/cobros-del-exterior`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    if (incomingMessage === "5") {
        await Whatsapp.sendText({
            message: `Por ahora, podés ir a nuestro *Centro de ayuda*. Tenemos un montón de *artículos para ayudarte con todas tus operaciones e inconvenientes:* https://ayuda.santander.com.ar.`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    if (incomingMessage === "6") {
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        textMessage("hola", recipientPhone);
    }
};

export const radioButtonMenuInicio = async (
    incomingMessage,
    recipientPhone
) => {
    if (incomingMessage === "5") {
        const listaDeSesiones = [
            {
                title: "Selecciona una opcion",
                rows: [
                    {
                        title: "Cobrar honorarios",
                        description: "1",
                        id: "cobrar_honorarios",
                    },
                    {
                        title: "Aumentar limite tarjeta",
                        description: "2",
                        id: "aumentar_limite_tarjeta",
                    },
                    {
                        title: "Que es Getnet",
                        description: "3",
                        id: "que_es_getnet",
                    },
                    {
                        title: "Soy Freelancer",
                        description: "4",
                        id: "soy_freelancer",
                    },
                    {
                        title: "Preguntas frecuentes",
                        description: "5",
                        id: "preguntas_frecuentes",
                    },
                    {
                        title: "Volver al menu inicial",
                        description: "6",
                        id: "menu_inicial",
                    },
                ],
            },
        ];
        await Whatsapp.sendRadioButtons({
            recipientPhone: recipientPhone,
            headerText: "¿En qué puedo ayudarte? 👇",
            bodyText:
                "1️⃣. Quiero empezar a cobrar mi sueldo u honorario en Santander\n2️⃣. Aumentar límite de Tarjeta de Crédito Santander\n3️⃣. ¿Qué es Getnet?\n4️⃣. Soy freelancer, ¿puedo acreditar mi orden de pago en dólares? \n5️⃣. Preguntas Frecuentes\n6️⃣. Volver al menu inicial",
            footerText: "Ingresá el número de opción seleccionada:",
            listOfSections: listaDeSesiones,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);

        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "consultas",
        });
    } else if (incomingMessage === "4") {
        await replyButtonNoExiste("crearCuenta", recipientPhone);
    } else {
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
                            id: "comprar_mep",
                        },
                        {
                            title: "VENDER Dolar Mep",
                            id: "vender_mep",
                        },
                    ],
                });
                datos = datos.filter(
                    (item) => item.recipientPhone !== recipientPhone
                );
                datos.push({
                    recipientPhone,
                    listaDeSesiones,
                    id: "comprarVenderMEP",
                });
            }

            if (incomingMessage === "6") {
                await cerrarSesion(recipientPhone);
                await Whatsapp.sendText({
                    message: `Su sesión se cerró con exito.`,
                    recipientPhone: recipientPhone,
                });
                datos = datos.filter(
                    (item) => item.recipientPhone !== recipientPhone
                );
            }
        }
        if (existe === "noExiste") {
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
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
    }
};

export const replyButton = async (incomingMessage, recipientPhone) => {
    const { compra, venta } = await dolarMep();
    // const compra = 315;
    // const venta = 310;
    if (incomingMessage === "comprar_mep") {
        await Whatsapp.sendText({
            message: `El precio actual estimado es de $ ${compra}\n\nIngrese la cantidad de USD que desea comprar (en numeros):`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "comprarMEP",
        });
    }
    if (incomingMessage === "vender_mep") {
        await Whatsapp.sendText({
            message: `El precio actual estimado es de $ ${venta}\n\nIngrese la cantidad de USD que desea vender (en numeros):`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "venderMEP",
        });
    }
};

export const comprarVenderMEP = async (incomingMessage, id, recipientPhone) => {
    const { compra, venta } = await dolarMep();
    // const compra = 315;
    // const venta = 310;
    const { uid, documento } = await existeCel(recipientPhone);
    const { pesos, dolares } = await saldo(uid);
    let numeroDeCuenta = documento;
    let comprarDolares = compra * incomingMessage;
    let venderDolares = venta * incomingMessage;

    if (
        (id === "comprarMEP" &&
            !isNaN(incomingMessage) &&
            pesos < comprarDolares) ||
        (id === "venderMEP" &&
            !isNaN(incomingMessage) &&
            dolares < incomingMessage)
    ) {
        await Whatsapp.sendText({
            message: `No contas con suficiente saldo para realizar la operacion indicada`,
            recipientPhone: recipientPhone,
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
    }
    if (
        id === "comprarMEP" &&
        !isNaN(incomingMessage) &&
        pesos > comprarDolares
    ) {
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
                comprarDolares
            )}\n▫ Dolares a recibir: U$D ${Intl.NumberFormat("es-AR").format(
                incomingMessage
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
            id: "estaDeAcuerdo",
            accion: "comprarMEP",
            pesos: comprarDolares,
            dolares: Number(incomingMessage),
        });
    } else if (
        id === "venderMEP" &&
        !isNaN(incomingMessage) &&
        dolares > incomingMessage
    ) {
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
                venderDolares
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
            id: "estaDeAcuerdo",
            accion: "venderMEP",
            pesos: venderDolares,
            dolares: Number(incomingMessage),
        });
    }
    if (isNaN(incomingMessage)) {
        await Whatsapp.sendText({
            message: `Debe ingresar el monto en formato numero`,
            recipientPhone: recipientPhone,
        });
    }
};

export const estaDeAcuerdo = async (incomingMessage, recipientPhone) => {
    if (incomingMessage === "esta_de_acuerdo") {
        const { token } = await existeCel(recipientPhone);
        // const { saldos } = await saldo(token);
        datos.forEach(async (item) => {
            if (item.accion === "comprarMEP") {
                await compraVentaDolares(token, item.dolares);
                await compraVentaPesos(token, -item.pesos);
            }
            if (item.accion === "venderMEP") {
                await compraVentaDolares(token, -item.dolares);
                await compraVentaPesos(token, item.pesos);
            }
        });

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
                    id: "comprar_mep",
                },
                {
                    title: "VENDER Dolar Mep",
                    id: "vender_mep",
                },
            ],
        });
        datos = datos.filter((item) => item.recipientPhone !== recipientPhone);
        datos.push({
            recipientPhone,
            listaDeSesiones,
            id: "comprarVenderMEP",
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
            message: `📩 Te voy a mandar un código a tu mail (${email.replace(
                /(\w{1})[\w.-]+@([\w.]+\w)/,
                "$1*****@$2"
            )}). Si no lo recibís, recordá revisar el correo no deseado.\n\n¿Cuál es el código de verificación?\n\n(token: ${tokenConfirm})`,
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
    //aca tengo que verificar que dni que ingreso no existe en BD
    const regexDNI = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/;

    if (regexDNI.test(incomingMessage)) {
        const { existe } = await existeCelDni(incomingMessage, recipientPhone);
        if (existe === "existeCel") {
            await Whatsapp.sendText({
                message: "Ya existe una cuenta registrada con este DNI",
                recipientPhone: recipientPhone,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            createAccount = createAccount.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
        } else {
            createAccount.forEach((item) => {
                if (item.recipientPhone === recipientPhone) {
                    Object.assign(item, { documento: incomingMessage });
                    item.numeroDeIntentos = 0;
                }
            });
            await Whatsapp.sendText({
                message:
                    "¿Me decís tu email? Recordá que con él vas a poder acceder a tu cuenta.",
                recipientPhone: recipientPhone,
            });
            datos = datos.filter(
                (item) => item.recipientPhone !== recipientPhone
            );
            datos.push({
                recipientPhone,
                listaDeSesiones,
                id: "verificarEmail",
            });
        }
    } else {
        createAccount.forEach(async (item) => {
            if (
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
                    message: `Debe ingresar un DNI válido`,
                    recipientPhone: recipientPhone,
                });
            }

            if (
                item.recipientPhone === recipientPhone &&
                item.numeroDeIntentos === 0
            ) {
                await Whatsapp.sendText({
                    message: `Debe ingresar un DNI válido`,
                    recipientPhone: recipientPhone,
                });
                item.numeroDeIntentos = 1;
            }
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
                item.numeroDeIntentos = 0;
            }
        });
    } else {
        createAccount.forEach(async (item) => {
            if (
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
                    message: `Debe ingresar un Email válido`,
                    recipientPhone: recipientPhone,
                });
            }

            if (
                item.recipientPhone === recipientPhone &&
                item.numeroDeIntentos === 0
            ) {
                await Whatsapp.sendText({
                    message: `Debe ingresar un Email válido`,
                    recipientPhone: recipientPhone,
                });
                item.numeroDeIntentos = 1;
            }
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

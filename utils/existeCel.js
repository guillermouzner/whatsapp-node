import fetch from "node-fetch";
export const existeCel = async (numTel) => {
    try {
        const data = await fetch(
            "https://homebanking-wp.herokuapp.com/auth/loginCel",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ numTel: numTel }),
            }
        );
        const response = await data.json();

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const existeCelDni = async (documento, numTel) => {
    try {
        const data = await fetch(
            "https://homebanking-wp.herokuapp.com/auth/loginCelDni",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ documento: documento, numTel: numTel }),
            }
        );
        const response = await data.json();

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const saldo = async (uid) => {
    try {
        const obtenerSaldo = await fetch(
            `https://homebanking-wp.herokuapp.com/home/${uid}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const responseSaldo = await obtenerSaldo.json();

        return responseSaldo;
    } catch (error) {
        console.log(error);
    }
};

export const cerrarSesion = async (numTel) => {
    try {
        const cerrarSesion = await fetch(
            `https://homebanking-wp.herokuapp.com/auth/logoutCel/${numTel}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const responseSesion = await cerrarSesion.json();

        return responseSesion;
    } catch (error) {
        console.log(error);
    }
};

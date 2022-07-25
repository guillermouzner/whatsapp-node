export const compraVentaPesos = async (token, cantidadCompraVenta) => {
    try {
        const data = await fetch(
            "https://homebanking-wp.herokuapp.com/home/pesos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    cantidadCompraVenta: cantidadCompraVenta,
                }),
            }
        );
        const response = await data.json();

        return response;
    } catch (error) {
        console.log(error);
    }
};

export const compraVentaDolares = async (token, cantidadCompraVenta) => {
    try {
        const data = await fetch(
            "https://homebanking-wp.herokuapp.com/home/dolares",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
                body: JSON.stringify({
                    cantidadCompraVenta: cantidadCompraVenta,
                }),
            }
        );
        const response = await data.json();

        return response;
    } catch (error) {
        console.log(error);
    }
};

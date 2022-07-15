import fetch from "node-fetch";
export const dolarMep = async () => {
    try {
        const data = await fetch(
            "https://api-dolar-argentina.herokuapp.com/api/dolarbolsa"
        );
        const response = await data.json();

        return response;
    } catch (error) {
        console.log(error);
    }
};

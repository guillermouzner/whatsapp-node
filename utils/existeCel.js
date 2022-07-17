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

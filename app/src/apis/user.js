const serverURL = process.env.REACT_APP_SERVER_URL;

// REGISTER
export const userRegister = async(userData) => {
    try {
        const url = `${serverURL}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userData
        })
        .then(async(response) => {
            if (response.status === 201) return await response.json();
            return response.status;
        })
        .catch((err)=>console.log("Register user res: ", err));

        return response;
    } catch (error) {
        console.log("REGISTER USER: ", error);
    }
}

// LOGIN
export const loginUser = async (userData) => {
    try {
        const url = `${serverURL}`;
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: userData
        })
        .then(async response => {
            if (response.status === 200) return await response.json();
            if (!response.ok) return;
            return response.status;
        })
        .catch(err => console.log("Login user res: ", err));

        return response;
    } catch (error) {
        console.log("LOGIN USER: ", error);
    }
}

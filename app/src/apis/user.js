const serverURL = process.env.REACT_APP_SERVER_URL;

// REGISTER
export const userRegister = async(userData) => {
    try {
        const url = `${serverURL}/auth/register`;
        const response = await fetch(url, {
            method: "POST",
            
            body: userData
        })
        .then(async(response) => {
            if (response.status === 201) return await response.json();
            return response.status;
        })
        .catch((err)=>console.log("Register user res: ", err));
        console.log(response)
        return response;
    } catch (error) {
        console.log("REGISTER USER: ", error);
    }
}

// LOGIN
export const userLogin = async (userData) => {
    try {
        const url = `${serverURL}/auth/login`;
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

// GET USER
export const readUser = async(userId, token) => {
    try {
        const url = `${serverURL}/users/${userId}`;
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: token }
        })
        .then(async(response) => await response.json())
        .catch((err) => console.log("readUser res: ", err));

        return response;
    } catch (err) {
        console.log("readUser: ", err);
    }
}

// GET USER FRIENDS
export const getUserFriends = async(userId, token) => {
    try {
        const url = `${serverURL}/users/${userId}/friends`;
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: token }
        })
        .then(async(response) => await response.json())
        .catch((err) => console.log("getUserFriends res: ", err));

        return response;
    } catch (err) {
        console.log("getUserFriends : ", err);
    }
}

// UPDATE USER FRIENDS LISTS
export const updateUserFriendsLists = async(userId, friendId, token) => {
    try {
        const url = `${serverURL}/users/${userId}/${friendId}`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: {Authorization: token, "Content-Type": "application/json",}
        })
        .then(async(response) => await response.json())
        .catch((err) => console.log("updateUserFriendsLists res: ", err));

        return response;
    } catch (err) {
        console.log("updateUserFriendsLists: ", err);
    }
}
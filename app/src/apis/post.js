const serverURL = process.env.REACT_APP_SERVER_URL;

// SEND POST
export const creatPost = async (postData, token) => {
    try {
        const url = `${serverURL}/post`;
        const response = await fetch(url, {
            method: "POST",
            headers: {Authorization: token},
            body: postData
        })
        .then(async(response) => await response.json())
        .catch((err) => console.log("sendPost res: ", err))

        return response;
    } catch (err) {
        console.log("Send Post: ", err);
    }
}

// GET POSTS
export const readPosts = async(token) => {
    try {
        const url = `${serverURL}/posts`;
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: token }
        })
        .then(async(response) => await response.json())
        .catch((err) => console.log("getPost res: ", err));

        return response;
    } catch (err) {
        console.log("getPosts : ", err);
    }
}

// GET USER POSTS
export const readUserPosts = async(userId, token) => {
    try {
        const url = `${serverURL}/posts/${userId}/posts`;
        const response = await fetch(url, {
            method: "GET",
            headers: { Authorization: token }
        })
        .then(async(response) => await response.json())
        .catch((err) => console.log("getUserPost res: ", err));

        return response;
    } catch (err) {
        console.log("getUserPosts : ", err);
    }
}

// UPDATE POST - LIKE
export const updatePost = async(data, token, postId) => {
    try {
        const url = `${serverURL}/posts/${postId}/like`;
        const response = await fetch(url, {
            method: "PATCH",
            headers: { Authorization: token, "Content-Type": "application/json" },
            body: data
        })
        .then(async(response) => await response.json())
        .catch((err) => console.log("updatePost - like res: ", err));

        return response;
    } catch (err) {
        console.log("updatePost - like : ", err)
    }
}
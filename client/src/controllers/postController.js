import {getMe} from "./userController"

const createPost = async (content) => {
    // const content = content;
    console.log("content: ", content)
    const token = localStorage.getItem("token");
    if (!token) {
        throw Error("No token found");
    }
    const user = await getMe();
    // userId = user._id;
    console.log("user", user)
    
    console.log("hahxhshshshshs-2")
    console.log("this is before we fetch")
    const res = await fetch("/api/posts/create", {
    method: "POST",
    headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    // body: JSON.stringify({ content, userId })
    });
    console.log("we're back!! ", res)
    const data = await res.json();
    return res; 
}

export {
    createPost
  };
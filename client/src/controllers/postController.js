const createPost = async (content) => {
    const content = content;
    const token = localStorage.getItem("token");
    if (!token) {
        throw Error("No token found");
    }
    const user = await getMe();
    content._id = user._id;
    const res = await fetch("/api/posts/", {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ content}),
    });
    const data = await res.json();
    return res; 
}

export {
    createPost
  };
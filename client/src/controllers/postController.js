const createPost = async (content) => {
  if (!content) {
    throw Error("Your post must include content");
  }
  const token = localStorage.getItem("token");
  if (!token) {
    throw Error("No token found");
  }
  const res = await fetch("/api/posts/create", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Issue here
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  return res;
};

export { createPost };

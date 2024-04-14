/****** Login User ******/
const loginUser = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields are required");
  }

  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  // data is the response from the server
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.user.username);
  localStorage.setItem("email", data.user.email);

  return data;
};

/****** Register User ******/
const registerUser = async (
  firstName,
  lastName,
  username,
  email,
  password,
  passwordConfirm
) => {
  if (!firstName || !lastName || !password || !passwordConfirm) {
    throw Error("All fields are required");
  }
  if (password !== passwordConfirm) {
    throw Error("Passwords do not match");
  }

  const res = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, username, email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  localStorage.setItem("token", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("email", data.email);

  return data;
};

/****** Find User ******/
const findUser = async (userId) => {
  const res = await fetch(`/api/users/find/${userId}`);
  const data = await res.json();
  if (!res.ok) {
    throw Error(data.error);
  }
  return data;
};

export { loginUser, registerUser, findUser };

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
  //  Already checked in the backend
  // Check if username is taken
  //   if (!username) {
  //     throw Error("Username is required");
  //   } else {
  //     const res = await fetch(`/api/users/${username}`);
  //     const data = await res.json();
  //     if (res.ok) {
  //       throw Error(data.error);
  //     }
  //   }

  //   // Check if email is taken
  //   if (!email) {
  //     throw Error("Email is required");
  //   } else {
  //     const res = await fetch(`/api/users/${email}`);
  //     const data = await res.json();
  //     if (res.ok) {
  //       throw Error(data.error);
  //     }
  //   }

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

/****** Check Username ******/

export { loginUser, registerUser };

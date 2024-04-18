import { useState, useEffect } from "react";
import { getMe, updateUserData } from "../controllers/userController";

const Settings = () => {
  const imagePlaceholder = "../images/avatar.png"; // To be removed later

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        setSuccess(null);
        break;
      case "lastName":
        setLastName(value);
        setSuccess(null);
        break;
      case "email":
        setEmail(value);
        setSuccess(null);
        break;
      case "password":
        setPassword(value);
        setSuccess(null);
        setError(null);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setSuccess(null);
        setError(null);
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    // if (e.target.files && e.target.files[0]) {
    //   setImage(e.target.files[0]);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, email, password, image };
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (
      (password.length < 8 && password.length > 0) ||
      (confirmPassword.length < 8 && confirmPassword.length > 0)
    ) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!firstName || !lastName || !email) {
      setError("You cannot update with empty fields");
      return;
    }
    try {
      const data = await updateUserData(userData);
      console.log("Profile updated successfully:", data);
      setSuccess("Profile updated successfully");
      setPassword("");
      setError(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message); // Set error message for display
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title mb-4">Profile Settings</h2>
        <div className="flex justify-center">
          <label htmlFor="image">
            <img
              src={imagePlaceholder}
              alt="avatar"
              className="w-[100px] mb-4"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="w-7 h-7 rounded-full border border-gray-500 bg-white absolute top-[255px] left-[210px] flex justify-center items-center">
            <i className="fa-solid fa-pen fa-sm text-gray-500"></i>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input pl-2"
              value={firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="input pl-2"
              value={lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input pl-2"
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input pl-2"
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input pl-2"
              value={confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <button type="submit" className="form-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

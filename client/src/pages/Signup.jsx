import { useState, useContext } from "react";
import { Alert } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../controllers/userController";
import { UserContext } from "../contexts/userContext";

const Signup = () => {
  // User context
  const { user, setUser } = useContext(UserContext);

  // Use navigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { user } = await registerUser(
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword
      );
      // Update the user state
      setUser(user);
      setError(null);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">Create an Account</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="input-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <Alert message={error} type="error" />}

          <button type="submit" className="form-btn">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center font-merriweather text-sm pt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-emeraldMist">
            Log in
          </Link>
        </p>
        {/* Google/Apple Signup Buttons */}
        {/* <div className="flex items-center mt-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="px-4 py-2 bg-white text-sm text-gray-300">or</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <div className="justify-center mt-4">
        <button className="bg-[#DB4437] w-full text-white py-2 px-4 rounded-md">Sign up with Google</button>
        <button className="bg-primary w-full text-white py-2 px-4 rounded-md mt-3">Sign up with Apple</button>
      </div> */}
      </div>
    </div>
  );
};

export default Signup;

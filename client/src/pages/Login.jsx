import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components";
import { loginUser } from "../controllers/userController";
import { UserContext } from "../contexts/userContext";

const Login = () => {
  // User context
  const { user, setUser } = useContext(UserContext);

  // Use navigate hook
  const navigate = useNavigate();

  // Error state
  const [error, setError] = useState(null);

  // Form data state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Login the user
      const { user } = await loginUser(email, password);
      // Update the user state > this may be handled in the controller
      setUser(user);
      setError(null);
      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">Login to Your Account</h2>
        <form onSubmit={handleLogin}>
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

          {error && <Alert message={error} type="error" />}

          <button type="submit" className="form-btn">
            Login
          </button>
        </form>
        {/* Google/Apple Login Buttons */}
        {/* <div className="flex items-center mt-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="px-4 py-2 bg-white text-sm text-gray-300">or</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <div className="justify-center mt-4">
        <button className="bg-[#DB4437] w-full text-white py-2 px-4 rounded-md">Login using Google</button>
        <button className="bg-primary w-full text-white py-2 px-4 rounded-md mt-3">Login using Apple</button>
      </div> */}
      </div>
    </div>
  );
};

export default Login;

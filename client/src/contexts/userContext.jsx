import { createContext, useState } from "react";

// This user context is a component and needs to be exported to be used in other components
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: localStorage.getItem("username") || null, // Get the username from local storage
    email: localStorage.getItem("email") || null, // Get the email from local storage
    posts: [],
  });

  // The value prop is the data that we want to share with other components
  // UserContext.Provider is a wrapper component that we use to wrap the components that need access to the data
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

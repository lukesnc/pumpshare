import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Follow = () => {
  const imagePlaceholder = "../images/avatar.png"; // To be removed later

  const { username } = useParams();
  const { follow } = useParams();

  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/users/${username}/${follow}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user list");
        }
        const data = await response.json();
        setUserList(data.usersList);
      } catch (error) {
        console.error("Error fetching user list:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserList();
  }, [username, follow]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px] text-center">
        <h2 className="mb-3">@{username}</h2>
        <h2 className="form-title">
          {follow.charAt(0).toUpperCase() + follow.slice(1)}
        </h2>
        {/* Users Display */}
        {isLoading ? (
          <p className="text-center">Loading users...</p> // Loading message
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : userList.length > 0 ? (
          <ul>
            {userList.map((user) => (
              <li key={user._id}>
                <Link to={`/${user.username}`}>
                  <div className="flex text-primary my-4">
                    {/* Avatar */}
                    <div className="mr-2">
                      <img
                        src={
                          user && user.avatar !== undefined
                            ? `../images/${user.avatar}`
                            : "../images/avatar.png"
                        }
                        alt="avatar"
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    </div>
                    {/* User Info */}
                    <div className="">
                      <span className="text-[14px] font-semibold mr-2">
                        {user.firstName} {user.lastName}
                      </span>
                      <span className="text-[14px] text-gray-400">
                        {"@" + user.username}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No users to show.</p>
        )}
      </div>
    </div>
  );
};

export default Follow;

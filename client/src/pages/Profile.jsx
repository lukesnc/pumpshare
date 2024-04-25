import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PostCard, Alert } from "../components";
import styles from "../style";
import { followUser } from "../controllers/userController";

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followError, setFollowError] = useState(null);
  const [userExists, setUserExists] = useState(true);

  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        const data = await response.json();
        if (!response.ok) {
          if (response.status === 404) {
            setUserExists(false);
          }
          throw new Error("Error fetching user data");
        }
        setFollowers(data.followers.length);
        setFollowing(data.following.length);
        setUserData(data);

        if (data.posts.length > 0) {
          const postResponse = await fetch(`/api/posts/user/${data._id}`);
          if (!postResponse.ok) {
            throw new Error("Error fetching posts");
          }
          const postsData = await postResponse.json();
          setPosts(postsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`/api/users/${user.username}/following`);
        if (!response.ok) {
          throw new Error("Error fetching followers");
        }
        const data = await response.json();
        if (data.usersList.length > 0) {
          const followingList = data.usersList.map((user) => user.username);
          setIsFollowing(followingList.includes(username));
        }
      } catch (error) {}
    };

    fetchFollowing();
  }, [username]);

  const firstName = userData ? userData.firstName : "";
  const lastName = userData ? userData.lastName : "";

  const handleFollow = async (followers) => {
    try {
      const res = await followUser(username);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setIsFollowing(true);

      setFollowers(++followers);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div>
      {userExists ? (
        <div className="flex flex-col min-h-screen bg-gray-100 items-center">
          <div className="flex flex-col items-center mt-[5rem] w-full">
            <div className="">
              <img
                src="./images/avatar.png"
                alt="avatar"
                className="w-[10rem]"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <h1 className="text-[24px] font-semibold mt-2">
                {firstName} {lastName}
              </h1>
              <p className="text-gray-400">@{username}</p>
              <div className="flex mt-4 justify-evenly w-full">
                {/* Follow Button */}
                {username === user.username || isFollowing ? (
                  ""
                ) : (
                  <button
                    className="bg-tealGreen text-white px-4 py-2 rounded-md"
                    onClick={() => handleFollow(followers)}
                  >
                    <i className="fa-solid fa-plus mr-3"></i>Follow
                  </button>
                )}
                {followError && <Alert message={followError} type="error" />}
              </div>
              <div className="flex mt-4 justify-evenly w-full">
                <Link to={`/${username}/followers`} className="text-tealGreen">
                  {followers} Followers
                </Link>
                <Link to={`/${username}/following`} className="text-tealGreen">
                  {following} Following
                </Link>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div className="mt-5 w-full">
            <div className="">
              {/* >>> add a loading here (maybe in with posts.length?) <<< */}
              {posts.length === 0 && (
                <div className="flex mt-4 bg-white h-[100px]">
                  <p className="text-gray-400 mx-auto my-auto font-[16px]">
                    No posts available
                  </p>
                </div>
              )}
              {posts.map((post, index) => (
                <div
                  className={`${styles.postCard} flex flex-col border-t-2 border-gray-100`}
                  key={posts[index]}
                >
                  <PostCard
                    key={post.id}
                    id={post._id}
                    userId={post.user}
                    content={post.content}
                    comments={post.comments}
                    likes={post.likes}
                    timestamp={post.timestamp}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gray-100 items-center">
          <div className="flex flex-col items-center mt-[5rem] w-full">
            <div className="">
              <img
                src="./images/avatar.png"
                alt="avatar"
                className="w-[10rem]"
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <h1 className="text-[24px] font-semibold mt-2 mx-8 text-center">
                The user @{username} does not exist
              </h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

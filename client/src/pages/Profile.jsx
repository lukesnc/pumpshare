import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PostCard } from "../components";
import styles from "../style";

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${username}`);
        if (!response.ok) {
          throw new Error("Error fetching user data");
        }
        const data = await response.json();
        setUserData(data);

        if (data.posts.length > 0) {
          const postResponse = await fetch(`/api/posts/user/${data._id}`);
          if (!postResponse.ok) {
            throw new Error("Error fetching posts");
          }
          const postsData = await postResponse.json();
          console.log("postsData", postsData);
          setPosts(postsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  const firstName = userData ? userData.firstName : "";
  const lastName = userData ? userData.lastName : "";

  return (
    <div>
      {/* Profile Info */}
      <div className="flex flex-col min-h-screen bg-gray-100 items-center">
        <div className="flex flex-col items-center mt-[5rem] w-full">
          <div className="">
            <img src="./images/avatar.png" alt="avatar" className="w-[10rem]" />
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="text-[24px] font-semibold mt-2">
              {firstName} {lastName}
            </h1>
            <p className="text-gray-400">@{username}</p>
            <div className="flex mt-4 justify-evenly w-full">
              <Link to={`/${username}/followers`} className="text-tealGreen">
                Followers
              </Link>
              <Link to={`/${username}/following`} className="text-tealGreen">
                Following
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
            {posts.map((post) => (
              <div
                className={`${styles.postCard} flex flex-col border-t-2 border-gray-100`}
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
    </div>
  );
};

export default Profile;

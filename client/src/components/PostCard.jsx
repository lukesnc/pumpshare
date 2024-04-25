import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../style";
import { findUser } from "../controllers/userController";

const PostCard = ({
  id,
  userId,
  image,
  content,
  comments,
  likes,
  timestamp,
}) => {
  const imagePlaceholder = "../images/avatar.png"; // To be removed later

  const numLikes = likes.length;
  const numComments = comments.length;

  const [user, setUser] = useState(null); // Initialize user state to null

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await findUser(userId);
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const username = user ? user.username : "";
  const firstName = user ? user.firstName : "";
  const lastName = user ? user.lastName : "";

  return (
    <div className="flex text-primary flex-auto my-4">
      {/* Avatar - condition to remove if being viewed in profile */}
      <Link to={`/${username}`}>
        <div className="min-w-12 w-12">
          <img src={imagePlaceholder} alt="avatar" className="" />
        </div>
      </Link>
      {/* Content */}
      <div className="px-3 flex-auto">
        <Link to={`/${username}`}>
          <span className="text-[14px] font-semibold mr-3">
            {firstName} {lastName}
          </span>
          <span className="text-[14px]  text-gray-400">{"@" + username}</span>
        </Link>
        <Link to={`/post/${id}`}>
          <p className={`text-[14px] line-clamp-5 ${styles.truncate}`}>
            {content}
          </p>
        </Link>

        <div className="flex flex-auto mt-2">
          <span className="text-gray-400">{timestamp}</span>
          {/* Comment */}
          <button className="flex-auto flex-wrap">
            <i className={`fa-regular fa-message ${styles.postButton}`}></i>
            <span className="ml-1 text-gray-400 text-[10px]">
              {numComments}
            </span>
          </button>
          {/* Like Button */}
          <button className="">
            <i className={`fa-regular fa-heart ${styles.postButton}`}></i>
            <span className="ml-1 text-gray-400 text-[10px]">{numLikes}</span>
          </button>
        </div>
      </div>
      {/* Options */}
      <div className="">
        <i className={`fa-solid fa-ellipsis ${styles.postButton}`}></i>
      </div>
    </div>
  );
};

export default PostCard;

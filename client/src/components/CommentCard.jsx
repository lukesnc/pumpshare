import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../style";
import { findUser } from "../controllers/userController";

const CommentCard = ({ id, userId, image, content, likes, timestamp }) => {
  const imagePlaceholder = "../images/avatar.png"; // To be removed later

  const numLikes = likes.length;

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
          <img
            src={
              user && user.avatar !== undefined
                ? `../images/${user.avatar}`
                : "../images/avatar.png"
            }
            alt="avatar"
            className="rounded-full"
          />
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

        <p className={`text-[14px] line-clamp-5 ${styles.truncate}`}>
          {content}
        </p>

        <div className="flex flex-auto mt-2">
          <span className="text-gray-400">{timestamp}</span>

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

export default CommentCard;

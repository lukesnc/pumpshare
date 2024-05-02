import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  truncate,
}) => {
  const imagePlaceholder = "../images/avatar.png"; // To be removed later

  const navigate = useNavigate();

  const [user, setUser] = useState(null); // Initialize user state to null
  const [numLikes, setNumLikes] = useState(likes.length);
  const [numComments, setNumComments] = useState(comments.length);

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

  // useEffect(() => {
  //   const fetchLikes = async () => {
  //     try {
  //       // Assuming you have an API endpoint for fetching likes based on post ID
  //       const response = await fetch(`/api/posts/${id}/likes`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch likes");
  //       }
  //       const likeData = await response.json();
  //       setNumLikes(likeData.length);
  //     } catch (error) {
  //       console.error("Error fetching likes:", error);
  //     }
  //   };
  //   fetchLikes();
  // }, [id]);

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const response = await fetch(`/api/posts/${id}/comments`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch comments");
  //       }
  //       const commentData = await response.json();
  //       setNumComments(commentData.length);
  //       console.log("fetching and comments: ", commentData.length);
  //     } catch (error) {
  //       console.error("Error fetching comments:", error);
  //     }
  //   };

  //   fetchComments();
  // }, [id]);

  const username = user ? user.username : "";
  const firstName = user ? user.firstName : "";
  const lastName = user ? user.lastName : "";

  const handleComment = () => {
    navigate(`/post/${id}`, { state: "true" });
  };
  const handleLike = () => {};

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
          <p
            className={`text-[14px] ${truncate === true ? `line-clamp-5` : ""}`}
          >
            {content}
          </p>
        </Link>

        <div className="flex flex-auto mt-2">
          <span className="text-gray-400">{timestamp}</span>
          {/* Comment */}
          <button
            className="flex-auto flex-wrap"
            onClick={() => handleComment()}
          >
            <i className={`fa-regular fa-message ${styles.postButton}`}></i>
            <span className="ml-1 text-gray-400 text-[10px]">
              {numComments}
            </span>
          </button>
          {/* Like Button */}
          <button className="" onClick={(e) => handleLike(e)}>
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

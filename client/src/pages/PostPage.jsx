import { useState, useEffect } from "react";
import { PostCard, CommentCard } from "../components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "../style";

const PostPage = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  // Fetch post by id and related comments
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const pathState = location.state || false;

  useEffect(() => {
    setIsCommenting(pathState);
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const postData = await response.json();
        setPost(postData);
        // Fetch post comments
        const tmpComments = [];
        for (const id of postData.comments) {
          try {
            const r = await fetch(`/api/comments/${id}`);
            if (!r.ok) {
              throw new Error("Failed to fetch comment");
            }
            const data = await r.json();
            tmpComments.push(data);
          } catch (error) {
            console.log("Error fetching comment:", error);
          }
        }
        setComments(tmpComments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (content) => {
    setError("");
    try {
      if (!content) {
        setError("Your comment must include content");
        return;
      }
      const token = localStorage.getItem("token");
      if (!token) {
        throw Error("No token found");
      }
      const res = await fetch(`/api/comments/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Issue here
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      setIsCommenting(false);
      setComment("");
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
      setError(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col mt-2">
      {/* Post */}
      <div className="mt-12 w-full">
        <div className="">
          {post.likes && (
            <div
              className={`${styles.postCard} flex flex-col border-t-2 border-gray-100`}
            >
              <PostCard
                id={post._id}
                userId={post.user}
                content={post.content}
                comments={post.comments}
                likes={post.likes}
                timestamp={post.timestamp}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full">
        {/* Comments */}
        <div>
          <h3 className="text-center text-lg font-semibold font-merriweather text-gray-400 font-semibold my-5">
            Comments
          </h3>

          {/* Comments on post */}
          {comments &&
            comments.map((comment) => (
              <div
                key={comment._id}
                className={`${styles.commentCard} flex flex-col border-t-2 border-gray-100`}
              >
                <CommentCard
                  id={comment._id}
                  userId={comment.user}
                  content={comment.content}
                  likes={comment.likes}
                  timestamp={comment.timestamp}
                />
              </div>
            ))}
          <div className="bg-white py-6 border-t-2 border-gray-100">
            <p
              className={`text-primary text-[14px] mx-2 h-[600px] ${
                isCommenting ? "mb-[200px]" : ""
              }`}
            ></p>
          </div>

          {/* Add Comment */}
          <div className="flex bottom-0 justify-center w-full fixed z-auto box-shadow">
            {isCommenting && (
              <div className="absolute bottom-16 h-auto w-full border-4 border-emeraldMist rounded-t-lg box-shadow">
                <div className="h-full bg-white rounded-t-lg w-full p-4">
                  <div className="flex mx-2">
                    <h3 className="grow text-lg font-semibold font-merriweather mb-3">
                      Leave a response
                    </h3>
                    <i
                      className="fa-solid fa-xmark text-red-600 text-xl"
                      onClick={() => {
                        setIsCommenting(false), setError("");
                      }}
                    ></i>
                  </div>
                  <textarea
                    type="text"
                    id="input"
                    name="input"
                    className="w-full input h-[200px] border border-gray-300 outline-none"
                    value={comment}
                    autoFocus
                    onChange={(e) => {
                      setComment(e.target.value), setError("");
                    }}
                  />
                  {error && (
                    <p className="text-red-500 text-center mt-3">{error}</p>
                  )}
                </div>
              </div>
            )}
            <div className="bg-emeraldMist w-full font-merriweather">
              {!isCommenting ? (
                <button
                  className="bg-emeraldMist text-white font-medium py-5 px-4 w-full max-w-sm"
                  onClick={() => {
                    setIsCommenting(true), setError("");
                  }}
                >
                  Add Comment
                </button>
              ) : (
                <button
                  className="bg-emeraldMist text-white font-medium py-5 px-4 w-full max-w-sm"
                  onClick={(e) => handleSubmit(comment)}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;

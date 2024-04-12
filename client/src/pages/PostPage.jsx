import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostCard } from "../components";
import styles from "../style";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  // Fetch post by id
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        console.log("data", data);
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Post */}
      <div className="mt-12 w-full">
        <div className="">
          {post.likes && ( // Check if post data exists
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
          <h3 className="text-center text-gray-400 font-semibold my-5">
            Comments
          </h3>
          <div className="bg-white py-6 border-t-2 border-gray-100">
            <p className="text-primary text-[14px] mx-2">
              This is a fake comment. Replace with actual comments later.
            </p>
          </div>
          {/* Add Comment */}
          <div className="flex bg-emeraldMist bottom-0 justify-center w-full fixed z-50 shadow-md box-shadow">
            {/* app.css for dropshadow */}
            <button className="bg-emeraldMist text-white font-medium py-5 px-4 w-full max-w-sm">
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
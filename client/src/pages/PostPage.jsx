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
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px] text-center">
        <h2 className="form-title">Post Page</h2>
      </div>
      {/* <div
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
      </div> */}
    </div>
  );
};

export default PostPage;

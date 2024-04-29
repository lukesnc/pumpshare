import { useEffect, useState } from "react";
import styles from "../style";
import { PostCard } from "../components";

const ActivityFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center">
      <div className="flex-col w-full">
        <div className="w-full p-8 mt-[3em]">
          <h2 className="text-3xl font-semibold font-merriweather text-center mx-4">
            Activity Feed
          </h2>
            <a
              className="form-btn-outline"
              to="/create"
            >
              New Post
            </a>
        </div>
        {posts.map((post) => (
          <div
            key={post.id}
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
  );
};

export default ActivityFeed;

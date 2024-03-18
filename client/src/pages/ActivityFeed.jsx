import { useEffect, useState } from 'react';
import styles from '../style';
import { PostCard } from '../components';

const ActivityFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Make an HTTP GET request to fetch posts from the API endpoint
      const response = await fetch('/api/posts'); // Replace '/api/posts' with the actual API endpoint URL
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log(data);
      setPosts(data); // Update the state with the fetched posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center">
      <div className="flex-col w-full">
        <div className="w-full p-8 mt-10">
          <h2 className="text-3xl font-semibold font-merriweather text-center mx-4">Activity Feed</h2>
        </div>
              {posts.map(post => (
                <div className={`${styles.postCard} flex flex-col border-t-2 border-gray-100`}>
                  <PostCard
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    displayName={post.displayName}
                    content={post.content}
                    timestamp={post.timestamp}
                  />
                </div>
              ))}
      </div>
      
    </div>
  );
};

export default ActivityFeed;

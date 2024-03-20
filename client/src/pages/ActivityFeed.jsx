import { useEffect, useState } from 'react';
import styles from '../style';
import { PostCard } from '../components';

const ActivityFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts'); 
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      console.log(data);
      setPosts(data); 
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center">
      <div className="flex-col w-full">
        <div className="w-full p-8 mt-12">
          <h2 className="text-3xl font-semibold font-merriweather text-center mx-4">Activity Feed</h2>
        </div>
              {posts.map(post => (
                <div key={post.id} className={`${styles.postCard} flex flex-col border-t-2 border-gray-100`}>
                  <PostCard
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

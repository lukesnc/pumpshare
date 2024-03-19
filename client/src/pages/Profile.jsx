import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PostCard } from "../components"
import styles from '../style';

const Profile = () => {
    const post = {
        id: 1,
        username: 'username',
        displayName: 'displayName',
        content: 'This is a post!',
        timestamp: '2h ago'
    }

    const { username } = useParams();
    console.log(username);
    const [userData, setUserData] = useState(null);
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
      fetch(`/api/users/${username}`)
        .then(response => response.json())
        .then(data => setUserData(data))
        .catch(error => console.error('Error fetching user data:', error));
    }, [username]);
  
    if (!userData) {
      return <div>Loading...</div>;
    }
  
  return (
    <div>
        {/* Profile Info */}
        <div className='flex flex-col min-h-screen bg-gray-100 items-center'>
            <div className='flex flex-col items-center mt-[5rem] w-full'>
                <div className=''>
                    <img src='./images/avatar.png' alt='avatar' className='w-[10rem]' />
                </div>
                <div className='flex flex-col items-center w-full'>
                    <h1 className='text-[24px] font-semibold mt-2'>Fred Schuck</h1>
                    <p className='text-gray-400'>@fredschuck</p>
                    <div className='flex mt-4 justify-evenly w-full'>
                        <Link to={`/${username}/followers`} className='text-tealGreen'>Followers</Link>
                        <Link to={`/${username}/following`} className='text-tealGreen'>Following</Link>
                    </div>
                </div>
            </div>

        {/* Posts */}
        <div className='mt-5 w-full'>
            <div className=''>
                {/* {posts.map(post => ( */}
                    <div className={`${styles.postCard} flex flex-col border-t-2 border-gray-100`}>
                        <PostCard
                        // key and id share the same value, so we can use the id as the key?
                            // key={post.id}
                            id={post.id}
                            username={post.username}
                            displayName={post.displayName}
                            content={post.content}
                            timestamp={post.timestamp}
                        />
                    </div>
                    <div className={`${styles.postCard} flex flex-col border-t-2 border-gray-100`}>
                        <PostCard
                        // key and id share the same value, so we can use the id as the key?
                            // key={post.id}
                            id={post.id}
                            username={post.username}
                            displayName={post.displayName}
                            content={post.content}
                            timestamp={post.timestamp}
                        />
                    </div>
                {/* ))} */}
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default Profile
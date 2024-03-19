import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../style';

const PostCard = ({ id, username, displayName, image, content, timestamp }) => {
  const imagePlaceholder = './images/avatar.png'; // To be removed later

  return (
    <div className='flex text-primary flex-auto my-4'>
      {/* Avatar - condition to remove if being viewed in profile */}
      <div className='min-w-12 w-12'> 
        <img src={imagePlaceholder} alt="avatar" className='' />
      </div>
      {/* Content */}
      <div className='px-3 flex-auto'>

        <span className='font-semibold mr-3'>{displayName}</span>
        <span className='text-gray-400'>{'@' + username}</span>
        <p className={`line-clamp-5 ${styles.truncate}`}>{content}</p>

        <div className='flex flex-auto mt-2'>
          <span className='text-gray-400'>{timestamp}</span>
          {/* Comment */}
          <button className='flex-auto flex-wrap'>
            <i className={`fa-regular fa-message ${styles.postButton}`}></i>
          </button>
          {/* Like Button */}
          <button className=''> 
            <i className={`fa-regular fa-heart ${styles.postButton}`}></i>
          </button>
        </div>

      </div>
      {/* Options */}
      <div className=''>
        <i class={`fa-solid fa-ellipsis ${styles.postButton}`}></i>
      </div>
    </div>
  );
};

export default PostCard;

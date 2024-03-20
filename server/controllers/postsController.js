const User = require('../models/post');

exports.getAllPosts = (req, res) => {
    res.status(201).json(posts);
}

exports.postPost = (req, res) => {
    res.send('viewOnePost');
}
exports.create = (req,res)=>{
  res.send('Create');
}

// Sample posts
const posts = [
    {
      id: 1,
      username: 'user1',
      displayName: 'User 1',
      image: './images/avatar1.png',
      content: 'This is the first post!',
      timestamp: '2h ago'
    },
    {
      id: 2,
      username: 'user2',
      displayName: 'User 2',
      image: './images/avatar2.png',
      content: 'This is the second post!',
      timestamp: '3h ago'
    },
    {
      id: 3,
      username: 'user3',
      displayName: 'User 3',
      image: './images/avatar3.png',
      content: 'This is the third post!',
      timestamp: '4h ago'
    },
    {
      id: 4,
      username: 'user4',
      displayName: 'User 4',
      image: './images/avatar4.png',
      content: 'This is the fourth post!',
      timestamp: '5h ago'
    },
    {
      id: 5,
      username: 'user5',
      displayName: 'User 5',
      image: './images/avatar5.png',
      content: 'This is the fifth post!',
      timestamp: '6h ago'
    },
    {
      id: 6,
      username: 'user6',
      displayName: 'User 6',
      image: './images/avatar6.png',
      content: 'This is the sixth post!',
      timestamp: '7h ago'
    },
    {
      id: 7,
      username: 'user7',
      displayName: 'User 7',
      image: './images/avatar7.png',
      content: 'This is the seventh post!',
      timestamp: '8h ago'
    },
    {
      id: 8,
      username: 'user8',
      displayName: 'User 8',
      image: './images/avatar8.png',
      content: 'This is the eighth post!',
      timestamp: '9h ago'
    },
    {
      id: 9,
      username: 'user9',
      displayName: 'User 9',
      image: './images/avatar9.png',
      content: 'This is the ninth post!',
      timestamp: '10h ago'
    },
    {
      id: 10,
      username: 'user10',
      displayName: 'User 10',
      image: './images/avatar10.png',
      content: 'This is the tenth post!',
      timestamp: '11h ago'
    },
    {
      id: 11,
      username: 'user11',
      displayName: 'User 11',
      image: './images/avatar11.png',
      content: 'This is the eleventh post!',
      timestamp: '12h ago'
    },
    {
      id: 12,
      username: 'user12',
      displayName: 'User 12',
      image: './images/avatar12.png',
      content: 'This is the twelfth post!',
      timestamp: '13h ago'
    }
  ];
  
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const PostCreate = () => {
  const [content, setContent] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const data = await createPost(body);
      //path to be changed once page is made for viewing single exercise
      navigate("/log", { state: { logId: data._id } });
    } catch (error) {
      setError(error.message);
    }
  };

    const newPost = {
      title,
      body,
      created_at: new Date().toLocaleDateString(),
    };




  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">New Post</h2>
        <form onSubmit={handleCreatePost}>
          <div className="mb-4">
            <label htmlFor="PostInput" className="input-label">
              What's on your mind?
            </label>
            <input
              type="PostInput"
              id="PostInput"
              name="PostInput"
              className="input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          {error && <Alert message={error} type="error" />}

          <button type="submit" className="form-btn">
            Post
          </button>
          
        </form>
      </div>
    </div>
  );
};


export default PostCreate;
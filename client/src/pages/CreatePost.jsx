import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../controllers/postController";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost(content);
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.error);
      }
      navigate("/activity");
    } catch (error) {
      setError("Your post must include content");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="form-title">New Post</h2>

        <form className="log-form" onSubmit={handleCreatePost}>
          <div className="mb-4">
            <label htmlFor="PostInput" className="input-label">
              What's on your mind?
            </label>
            <textarea
              type="text"
              id="input"
              name="input"
              className="w-full input h-12 outline-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button type="submit" className="form-btn">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

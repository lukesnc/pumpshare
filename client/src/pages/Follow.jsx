import { useParams } from "react-router-dom";

const Follow = () => {
    const { username } = useParams();
    const { follow } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px] text-center">
        <h2 className='mb-3'>@{username}</h2>
        <h2 className="form-title">{follow.charAt(0).toUpperCase() + follow.slice(1) }</h2>
        </div>
    </div>
  )
}

export default Follow
import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="text-3xl font-semibold font-merriweather text-center mb-10">Create an Account</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primary font-merriweather">Email</label>
            <input type="email" id="email" name="email" className="mt-1 h-[38px] block w-full border-emeraldMist rounded-md shadow-sm focus:border-emeraldMist focus:ring focus:ring-emeraldMist focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-primary font-merriweather">Password</label>
            <input type="password" id="password" name="password" className="mt-1 h-[38px] block w-full border-secondary rounded-md shadow-sm focus:border-emeraldMist focus:ring focus:ring-emeraldMist focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-primary font-merriweather">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" className="mt-1 h-[38px] block w-full border-secondary rounded-md shadow-sm focus:border-emeraldMist focus:ring focus:ring-emeraldMist focus:ring-opacity-50" />
          </div>
          <button type="submit" className="w-full mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-emeraldMist hover:bg-emeraldMist focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emeraldMist font-merriweather">Sign Up</button>
        </form>
        {/* Google/Apple Signup Buttons */}
        {/* <div className="flex items-center mt-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="px-4 py-2 bg-white text-sm text-gray-300">or</span>
        <div className="border-t border-gray-300 w-full"></div>
      </div>
      <div className="justify-center mt-4">
        <button className="bg-[#DB4437] w-full text-white py-2 px-4 rounded-md">Sign up with Google</button>
        <button className="bg-primary w-full text-white py-2 px-4 rounded-md mt-3">Sign up with Apple</button>
      </div> */}

      </div>
    </div>
  );
};

export default Signup;

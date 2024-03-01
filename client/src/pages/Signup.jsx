import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="max-w-md w-full p-8 mx-4 bg-white rounded-lg shadow-md mb-auto mt-[100px]">
        <h2 className="text-3xl font-semibold font-merriweather text-center mb-10">Create an Account</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primary font-merriweather">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-primary font-merriweather">Password</label>
            <input type="password" id="password" name="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-primary font-merriweather">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50" />
          </div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-emeraldMist hover:bg-emeraldMist focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 font-merriweather">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

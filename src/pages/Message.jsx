import React from "react";

const Message = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your messages will appear here.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Recent Messages</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center bg-gray-200 p-3 rounded">
            <span>John Doe: Hey! How are you?</span>
            <span className="text-gray-500 text-sm">2 min ago</span>
          </li>
          <li className="flex justify-between items-center bg-gray-200 p-3 rounded">
            <span>Jane Smith: Don't forget the meeting tomorrow.</span>
            <span className="text-gray-500 text-sm">5 min ago</span>
          </li>
          <li className="flex justify-between items-center bg-gray-200 p-3 rounded">
            <span>Mike Johnson: Can you send me the report?</span>
            <span className="text-gray-500 text-sm">10 min ago</span>
          </li>
        </ul>
      </div>

      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        New Message
      </button>
    </div>
  );
};

export default Message;

import React from "react";

const Dosc = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Dosc Page</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to the Dosc page! Here you can manage your documents and files.
      </p>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">My Documents</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center bg-gray-200 p-3 rounded">
            <span>Document 1</span>
            <button className="text-blue-500 hover:underline">View</button>
          </li>
          <li className="flex justify-between items-center bg-gray-200 p-3 rounded">
            <span>Document 2</span>
            <button className="text-blue-500 hover:underline">View</button>
          </li>
          <li className="flex justify-between items-center bg-gray-200 p-3 rounded">
            <span>Document 3</span>
            <button className="text-blue-500 hover:underline">View</button>
          </li>
        </ul>
      </div>

      <button className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Upload New Document
      </button>
    </div>
  );
};

export default Dosc;

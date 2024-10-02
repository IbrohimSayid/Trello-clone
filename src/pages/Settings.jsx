import { useRef, useState } from "react";

const Settings = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log(`Selected file: ${file.name}`);
    }
  };

  return (
    <div className="p-4 flex-1 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Account Settings</h2>

      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3">Profile Information</h3> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full text-sm"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full text-sm"
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="input input-bordered w-full mb-3 text-sm"
          placeholder="youremail@example.com"
        />
        <div
          onClick={openFileDialog}
          className="border-2 border-dashed border-gray-400 rounded-lg p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
        >
          <p className="text-gray-600 text-sm">Click to upload or drag and drop</p>
          <p className="text-gray-500 text-xs">SVG, PNG, JPG or GIF (max 800x400px)</p>
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            className="hidden"
          />
          {selectedFile && (
            <p className="text-green-600 mt-1 text-sm">
              Selected file: {selectedFile.name}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            className="input input-bordered w-full text-sm"
            placeholder="Enter your role"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" className="btn bg-gray-300 text-gray-700 text-sm"> 
            Cancel
          </button>
          <button type="button" className="btn btn-primary text-white text-sm">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
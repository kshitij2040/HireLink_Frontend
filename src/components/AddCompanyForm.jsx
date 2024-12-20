import { useState } from "react";

export default function AddCompanyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve token from localStorage using the correct key
    const storedTokenData = localStorage.getItem("sb-pkibkhelrihzgohrlrrz-auth-token"); // Correct key
    if (!storedTokenData) {
      alert("Session expired. Please log in again.");
      return;
    }

    // Parse the stored token data to extract the access_token
    const tokenData = JSON.parse(storedTokenData);
    const token = tokenData?.access_token; // Use optional chaining to handle missing access_token
    if (!token) {
      alert("Token not found. Please log in again.");
      return;
    }

    console.log("Token retrieved:", token); // Log for debugging

    // Prepare job data
    const jobData = { title, description, link };

    try {
      const response = await fetch("https://hire-link-ten.vercel.app/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token to Authorization header
        },
        mode: "no-cors", 
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Job added successfully!");
      } else {
        const { message } = await response.json();
        alert(message || "Failed to add job");
      }
    } catch (err) {
      console.error("Error adding job", err);
      alert("An error occurred while adding the job");
    }
  };

  return (
    <div className="p-6 m-4 rounded-lg shadow-lg h-auto bg-opacity-30 backdrop-blur-md bg-blue-200/5 max-w-md w-full">
      <h2 className="text-white text-center text-2xl font-bold mb-6">Add Companies</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Company Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-400 bg-transparent border border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-400 bg-transparent border border-blue-500 focus:outline-none"
            rows="5"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="url"
            placeholder="Registration Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 rounded-lg text-gray-400 bg-transparent border border-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Add Company
        </button>
      </form>
    </div>
  );
}

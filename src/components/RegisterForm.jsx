"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://pkibkhelrihzgohrlrrz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraWJraGVscmloemdvaHJscnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4MDc0MDQsImV4cCI6MjA0OTM4MzQwNH0.AsqILxO0lHdqp-oKKnlcMkzUSvUn8scmmHkY988KCEY"
);

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Register the user with Supabase Authentication
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) {
        console.error("Error during signup:", authError);
        alert("An unknown error occurred. Please try again.");
        return;
      }
  
      const userId = authData.user.id;
  
      // Insert the user into the `users` table
      const { error: insertError } = await supabase
        .from("users")
        .insert([
          {
            id: userId,
            name,
            email,
            department,
            is_verified: false,
            password, // Optionally include the password (hashed if necessary)
          },
        ]);
  
      if (insertError) {
        console.error("Error inserting user data:", insertError);
        alert("Error occurred while creating user profile. Please contact support.");
        return;
      }
  
      alert("Verification mail sent to your Email Address!");
      router.push("/Login"); // Redirect to login page
    } catch (err) {
      console.error("Error during submission:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="p-4">
      <div className="p-6 bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg bg-blue-800/5 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">REGISTER</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-opacity-10 bg-white text-white placeholder-gray-300 border border-opacity-30 border-white rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-opacity-10 bg-white text-white placeholder-gray-300 border border-opacity-30 border-white rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-4 py-2 bg-opacity-10 bg-white text-white placeholder-gray-300 border border-opacity-30 border-white rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-opacity-10 bg-white text-white placeholder-gray-300 border border-opacity-30 border-white rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "REGISTER"}
          </button>
          <p className="text-sm text-center text-white mt-4">
            Already registered?{" "}
            <a href="/Login" className="text-blue-400 underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

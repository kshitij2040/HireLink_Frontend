"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient"; // Adjust the path as necessary

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Ensure email and password are not empty
      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });


      if (authError) {
        console.error("Login error:", authError.message);
        alert("Login failed. Please check your credentials.");
        return;
      }

      // Save token to localStorage
      const userToken = authData.session.access_token;
      localStorage.setItem("token", userToken);

      alert("Login successful!");
      router.push("/AddDescription"); // Redirect after login
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="p-6 bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg bg-blue-800/5 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="w-full px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white font-semibold rounded-md hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

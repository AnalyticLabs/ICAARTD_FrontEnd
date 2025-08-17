// import { motion } from "framer-motion";
// import { Lock, Mail, LogIn } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { account } from "../utils/appwrite";

// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await account.createEmailPasswordSession(
//         formData.email,
//         formData.password
//       );
//       toast.success("Login successful!");
//       navigate("/submit-paper", { state: { refreshUser: true } });
//     } catch (error) {
//       toast.error("Login failed.");
//     }
//   };
//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-200 px-4 overflow-hidden">
//       {/* Floating Background Shapes */}
//       <motion.div
//         animate={{ y: [0, -20, 0], x: [0, 40, 0], rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 10 }}
//         className="absolute top-12 left-10 w-60 h-60 bg-indigo-400 opacity-30 blur-3xl rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, 30, 0], x: [0, -30, 0], rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 14 }}
//         className="absolute bottom-16 right-10 w-64 h-64 bg-blue-300 opacity-30 blur-3xl rounded-full"
//       />

//       {/* Login Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 z-10"
//       >
//         <div className="flex items-center justify-center mb-6 text-indigo-600">
//           <LogIn className="w-7 h-7" />
//           <h2 className="ml-2 text-2xl font-extrabold tracking-wide">
//             Welcome Back
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           {/* Email */}
//           <div className="relative">
//             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Password"
//               className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//               required
//             />
//           </div>

//           {/* Submit */}
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.96 }}
//             type="submit"
//             className="w-full cursor-pointer text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300"
//           >
//             Login
//           </motion.button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-600 font-medium hover:underline"
//           >
//             Register
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { Lock, Mail, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { account } from "../utils/appwrite";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [role, setRole] = useState("Admin");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await account.createEmailPasswordSession(
  //       formData.email,
  //       formData.password
  //     );

  //     toast.success("Login successful!");
  //     navigate("/submit-paper", { state: { refreshUser: true } });
  //   } catch (error) {
  //     toast.error("Login failed.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await account.createEmailPasswordSession(
      //   formData.email,
      //   formData.password
      // );

      // // Get user details including preferences
      // const user = await account.get();
      // const userRole = user.prefs?.role || "Admin";

      // // Redirect based on role
      // if (userRole === "Admin") {
      //   navigate("/dashboard");
      // } else if (userRole === "Author") {
      //   navigate("/submit-paper");
      // } else {
      //   toast.error("Please select prefered role!");
      // }

      // toast.success("Login successful!");

      // 1. Login
      await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );

      // 2. Get user details from Appwrite
      const user = await account.get();
      const storedRole = user.prefs?.role;

      // 3. Check if role matches
      if (storedRole !== role) {
        toast.error(`You are registered as ${storedRole}, not ${role}`);
        await account.deleteSession("current"); // logout immediately
        return;
      }

      // 4. Redirect based on actual role
      if (storedRole === "Admin") {
        navigate("/dashboard");
      } else if (storedRole === "Author") {
        navigate("/submit-paper");
      }

      toast.success("Login successful");
    } catch (error) {
      if (error.code === 401) {
        toast.error("Invalid email or password");
      } else if (error.code === 404) {
        toast.error("User not registered yet!");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-100 to-purple-200 px-4 overflow-hidden">
      {/* Floating Background Shapes */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 40, 0], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-12 left-10 w-60 h-60 bg-indigo-400 opacity-30 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, -30, 0], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14 }}
        className="absolute bottom-16 right-10 w-64 h-64 bg-blue-300 opacity-30 blur-3xl rounded-full"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 z-10"
      >
        <div className="flex flex-col items-center justify-center mb-6 text-indigo-600">
          <LogIn className="w-7 h-7" />
          <h2 className="mt-2 text-2xl font-extrabold tracking-wide">
            Welcome Back
          </h2>

          {/* Toggle Tabs */}
          <div className="flex w-full mt-4 border border-indigo-300 rounded-xl overflow-hidden">
            {["Admin", "Author"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRole(tab)}
                className={`px-6 py-2 w-1/2 cursor-pointer font-medium transition-colors ${
                  role === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-indigo-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className="w-full cursor-pointer text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            Login as {role}
          </motion.button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

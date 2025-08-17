// import { motion } from "framer-motion";
// import { Mail, Lock, UserPlus, User } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { account } from "../utils/appwrite";
// import { ID } from "appwrite";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       await account.create(
//         ID.unique(),
//         formData.email,
//         formData.password,
//         formData.username
//       );

//       toast.success("Registration successful!");
//       navigate("/login");
//     } catch (error) {
//       toast.error("Registration failed");
//     }
//   };
//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 px-4 overflow-hidden">
//       {/* Background Shapes */}
//       <motion.div
//         animate={{ y: [0, -30, 0], x: [0, 30, 0], rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 12 }}
//         className="absolute top-10 left-10 w-72 h-72 bg-purple-400 opacity-30 blur-3xl rounded-full"
//       />
//       <motion.div
//         animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 15 }}
//         className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400 opacity-30 blur-3xl rounded-full"
//       />

//       {/* Form Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="w-full max-w-lg bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30 z-10"
//       >
//         <div className="flex items-center justify-center mb-6 text-indigo-600">
//           <UserPlus className="w-8 h-8" />
//           <h2 className="ml-2 text-2xl font-extrabold tracking-wide">
//             Create an Account
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-3">
//           {/* Username */}
//           <div className="relative">
//             <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Username"
//               className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
//               required
//             />
//           </div>

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

//           {/* Confirm Password */}
//           <div className="relative">
//             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
//             <input
//               type="password"
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Confirm Password"
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
//             Register
//           </motion.button>
//         </form>

//         <div className="mt-6 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-600 font-medium hover:underline"
//           >
//             Login
//           </Link>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  account,
  USERS_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../utils/appwrite";
import { ID, Query } from "appwrite";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [role, setRole] = useState("Admin");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     // 1. Create the user
  //     await account.create(
  //       ID.unique(),
  //       formData.email,
  //       formData.password,
  //       formData.username
  //     );

  //     // 2. Login the user immediately (to get a session and permission to update prefs)
  //     await account.createEmailPasswordSession(
  //       formData.email,
  //       formData.password
  //     );

  //     // 3. Set the role in user preferences
  //     await account.updatePrefs({ role });

  //     const user = await account.get();
  //     const userRole = user.prefs?.role || "Admin";

  //     // Redirect based on role
  //     if (userRole === "Admin") {
  //       navigate("/dashboard");
  //     } else if (userRole === "Author") {
  //       navigate("/submit-paper");
  //     } else {
  //       toast.error("Please select prefered role!");
  //     }

  //     toast.success("Registration successful!");
  //     // navigate("/login");
  //   } catch (error) {
  //     if (error.code === 409) {
  //       toast.error("User already exists! Please Login");
  //     } else {
  //       toast.error("Registration failed");
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // 1. If role = Admin, check if already exists
      if (role === "Admin") {
        const admins = await databases.listDocuments(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          [Query.equal("role", "Admin")]
        );

        if (admins.total > 0) {
          toast.error("An Admin already exists. Please login instead!");
          return;
        }
      }

      // 2. Create the user in Appwrite Auth
      const newUser = await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.username
      );

      // 3. Login the user (to set session)
      await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );

      // 4. Save role in user preferences
      await account.updatePrefs({ role });

      // 5. Save user in Appwrite Database
      await databases.createDocument(
        DATABASE_ID,
        USERS_COLLECTION_ID,
        ID.unique(),
        {
          userId: newUser.$id,
          email: formData.email,
          role,
        }
      );

      // 6. Redirect based on role
      if (role === "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/submit-paper");
      }

      toast.success("Registration successful!");
    } catch (error) {
      if (error.code === 409) {
        toast.error("User already exists! Please Login");
      } else {
        toast.error("Registration failed");
        console.error(error);
      }
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 px-4 overflow-hidden">
      {/* Background Shapes */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 30, 0], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute top-10 left-10 w-72 h-72 bg-purple-400 opacity-30 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0], rotate: 360 }}
        transition={{ repeat: Infinity, duration: 15 }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400 opacity-30 blur-3xl rounded-full"
      />

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30 z-10"
      >
        {/* Heading */}
        <div className="flex flex-col items-center justify-center mb-6 text-indigo-600">
          <UserPlus className="w-8 h-8" />
          <h2 className="mt-2 text-2xl font-extrabold tracking-wide">
            Create an Account
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 text-gray-800 bg-white/60 rounded-xl border border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
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
            Register as {role}
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

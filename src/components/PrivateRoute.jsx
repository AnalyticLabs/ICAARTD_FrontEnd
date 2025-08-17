// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { account } from "../utils/appwrite";

// export default function PrivateRoute({ children }) {
//   const [user, setUser] = useState(null);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     account
//       .get()
//       .then((user) => {
//         setUser(user);
//       })
//       .catch(() => {
//         setUser(null);
//       })
//       .finally(() => {
//         setChecking(false);
//       });
//   }, []);

//   if (checking)
//     return (
//       <div className="min-h-[60vh] flex justify-center items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
//       </div>
//     );

//   return user ? children : <Navigate to="/login" />;
// }

import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { account } from "../utils/appwrite";

export default function PrivateRoute({ children, allowedRoles }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    account
      .get()
      .then((userData) => {
        setUser(userData);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  if (checking) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Role checking from prefs
  const userRole = user.prefs?.role || "Admin"; // Default 'user' if not set

  if (!allowedRoles.includes(userRole)) {
    // If role is not allowed, send them away
    return <Navigate to="/" />;
  }

  return children;
}

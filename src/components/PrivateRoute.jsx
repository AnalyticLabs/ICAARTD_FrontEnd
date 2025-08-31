import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ allowedRoles, children }) {
  const { user } = useSelector((state) => state.auth);

  // If user is not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If user role is not allowed, redirect to home
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
}

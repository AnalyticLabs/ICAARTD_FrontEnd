import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Guidelines from './pages/Guidelines';
import SubmitPaper from './pages/SubmitPaper';
import ReviewProcss from './pages/ReviewProcess';
import Presentation from './pages/Presentation';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route
            path="submit-paper"
            element={
              <PrivateRoute allowedRoles={['Author', 'Admin']}>
                <SubmitPaper />
              </PrivateRoute>
            }
          />
          <Route path="guidelines" element={<Guidelines />} />
          <Route path="contact" element={<Contact />} />
          <Route path="review-process" element={<ReviewProcss />} />
          <Route path="presentation" element={<Presentation />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute allowedRoles={['Admin', 'Author']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>
);

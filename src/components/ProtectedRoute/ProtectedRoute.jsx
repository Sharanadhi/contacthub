import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // or use your auth logic

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;

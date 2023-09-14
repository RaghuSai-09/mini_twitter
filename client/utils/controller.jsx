/* eslint-disable react/prop-types */
import { useAuth } from './auth'; 
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
  const { isSigned } = useAuth();

  if (!isSigned) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Auth;

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const PublicRoute = ({ children }) => {
    const { currentUser } = useAuth();
    return !currentUser ? children : <Navigate to="/" />;
};

export default PublicRoute;

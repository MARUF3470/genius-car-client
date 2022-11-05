import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { loading } = useContext(AuthContext)
    const location = useLocation()
    const { user } = useContext(AuthContext)
    if (loading) {
        return <progress className="progress w-56 progress-success" value="40" ></progress>
    }
    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
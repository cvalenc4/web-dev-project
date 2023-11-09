import { Navigate } from "react-router-dom";
import { checkUser } from "./Auth/AuthService";

function ProtectedRoute({ children }) {
    return checkUser() ? children : <Navigate to="/auth/login" replace/>;
}

export default ProtectedRoute;
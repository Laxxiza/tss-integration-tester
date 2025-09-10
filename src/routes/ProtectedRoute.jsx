// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import GlobalLoading from "../components/GlobalLoading/GlobalLoading";

export default function ProtectedRoute({ children }) {
    console.log("ProtectedRoute");
    const { loading, user } = useAuth();

    if (loading) {
        console.log("заглушка");
        return <GlobalLoading />;
    }
    if (!user) {
        console.log("Роут на логин");
        return <Navigate to="/login" replace />;
    }

    return children;
}

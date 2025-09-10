import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ProjectsProvider } from "./context/ProjectsContext.jsx";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Template from "./pages/Template.jsx";
import "./index.css";
import GlobalLoading from "./components/GlobalLoading/GlobalLoading.jsx";

createRoot(document.getElementById("root")).render(
    <CookiesProvider>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/gtemp" element={<GlobalLoading />} />
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute>
                                <ProjectsProvider>
                                    <App />
                                </ProjectsProvider>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </CookiesProvider>
);

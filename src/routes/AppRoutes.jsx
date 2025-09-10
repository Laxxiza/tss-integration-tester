import { Routes, Route, Navigate  } from "react-router-dom";
import Jinja from "../pages/Jinja";
import Home from "../pages/Home";
import Logout from "../pages/Logout";
import Template from "../pages/Template";
import Projects from "../pages/Projects";
import GlobalLoading from "../components/GlobalLoading/GlobalLoading";
import App1 from "../App1"

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/*" element={<Navigate to="/projects" replace />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/testing" element={<div>Test</div>} />
            <Route path="/jinja" element={<Jinja />} />
            <Route path="/jsonpath" element={<div>jsonpath</div>} />
            <Route path="/home" element={<Home />} />
            <Route path="/temp" element={<GlobalLoading />} />
            <Route path="/app" element={<App1 />} />
        </Routes>
    );
}

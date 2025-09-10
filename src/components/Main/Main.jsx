import { Routes, Route, Navigate } from "react-router-dom";
import AppRoutes from "../../routes/AppRoutes";

export default function Main() {
    return (
        <div className="flex flex-1">
            <AppRoutes />
        </div>
    );
}

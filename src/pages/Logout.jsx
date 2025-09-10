import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Logout() {
    const { user, logoutUser } = useAuth();
    useEffect(() => {
        logoutUser();
        console.log(user);
    }, []);
}

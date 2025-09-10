import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    console.log("AuthProvider");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cookies, setCookies] = useCookies(["login"]);
    const navigate = useNavigate();

    const fetchUser = async (url, options) => {
        console.log("Проверка пользователя");
        setLoading(true);
        fetch(url, { credentials: "include", ...options })
            .then((res) => {
                if (!res.ok) {
                    console.log("Не авторизован");
                    throw new Error("Не авторизован");
                }
                return res.json();
            })
            .then((data) => {
                setUser(data.data.user);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const loginUser = (login) => {
        setCookies('login', login);
    };

    const logoutUser = () => {
        setCookies('login', null);
    };

    useEffect(() => {
        const userLogin = cookies?.login;
        console.log("Login in cookies " + userLogin);

        fetchUser("/api/login");
    }, [cookies]);

    return (
        <AuthContext.Provider value={{ loading, user, setUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
}

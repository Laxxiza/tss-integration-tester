import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Login() {
    console.log("Login");
    const { user, loading, loginUser } = useAuth();
    const [disabled, setDisabled] = useState(false);
    const [authError, setAuthError] = useState(false);
    const inputRef = useRef();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleClick();
    };

    function handleClick(e) {
        setAuthError(false);
        loginUser(inputRef.current.value);
    }

    useEffect(() => {
        if (loading) {
            setDisabled(true);
            return;
        }

        setDisabled(false);

        if (!user) setAuthError(true);
    }, [loading]);

    if (user) return <Navigate to="/" replace />;
    return (
        <div className="h-screen flex items-center justify-center editorBg">
            <div className="relative">
                <div
                    className={`min-w-96 px-8 py-6 text-left bg-white activityBar rounded-sm shadow-lg ${
                        disabled && "animate-pulse"
                    }`}
                >
                    <div className="flex flex-col justify-center items-center h-full gap-4">
                        <div className="flex flex-col items-center justify-center">
                            <p className="m-0 text-[20px] font-semibold text-white">
                                Авторизация
                            </p>
                            {authError && (
                                <p className="text-red-500 mt-1">
                                    Ошибка авторизации
                                </p>
                            )}
                        </div>
                        <div className="w-full flex flex-col gap-2">
                            <input
                                ref={inputRef}
                                disabled={disabled}
                                onKeyDown={handleKeyDown}
                                className="border rounded-sm px-3 py-2 text-sm w-full outline-none border-neutral-700 bg-neutral-800 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                                placeholder="Логин"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mt-4 justify-center items-center">
                        <button
                            disabled={disabled}
                            onClick={handleClick}
                            className="flex flex-col transition py-1 px-8 hover:bg-blue-800 bg-sky-600 text-white text-center text-base shadow-md rounded-sm cursor-pointer select-none disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            Войти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

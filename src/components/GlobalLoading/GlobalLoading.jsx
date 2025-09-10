import { useEffect, useRef, useState } from "react";

export default function GlobalLoading({ message = "Загрузка" }) {
    const [dot, setDot] = useState(0);
    const refLoad = useRef();

    useEffect(() => {
        let timeout = setInterval(() => {
            setDot((prev) => prev + 1);
        }, 500);

        return () => {
            clearInterval(timeout);
        };
    }, []);

    console.log("GlobalLoading");
    return (
        <div className="flex flex-1 h-dvh">
            <div
                className={`fixed flex flex-1 inset-0 items-center justify-center editorBg`}
            >
                <div className="relative max-w">
                    <div className="flex flex-1 min-w-64 px-8 py-6 text-left bg-white activityBar rounded-sm shadow-lg justify-center items-center">
                        <p className="m-0 text-[20px] font-semibold dark:text-white">
                            {message}
                            <span
                                className={
                                    (dot % 4) + 2 >= 3
                                        ? "opacity-100"
                                        : "opacity-0"
                                }
                            >
                                .
                            </span>
                            <span
                                className={
                                    (dot % 4) + 1 >= 3
                                        ? "opacity-100"
                                        : "opacity-0"
                                }
                            >
                                .
                            </span>
                            <span
                                className={
                                    dot % 4 >= 3 ? "opacity-100" : "opacity-0"
                                }
                            >
                                .
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

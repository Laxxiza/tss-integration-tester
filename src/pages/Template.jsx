import { useContext, useEffect, useRef, useState } from "react";

export default function Template() {
    console.log("Template render");
    const [dot, setDot] = useState(0);
    const refLoad = useRef();
    let loadingText = "Загрузка";
    useEffect(() => {
        let timeout = setInterval(() => {
            setDot((prev) => prev + 1);
            console.log(dot);
        }, 500);

        return () => {
            clearInterval(timeout);
        };
    }, []);

    return (
        <div class="flex flex-col">
            <section class="flex-1 p-6">
                    <h1 class="text-2xl mb-4">Контент</h1>
                    <p>Много текста...</p>
                    <div class="h-[2000px]"></div>
                </section>
        </div>
    );
}

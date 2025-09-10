import {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from "react";

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    console.log("LoadingProvider");
    const [loadingCount, setLoadingCount] = useState(0);

    const startLoading = useCallback(() => setLoadingCount((c) => c + 1));
    const stopLoading = useCallback(() =>
        setLoadingCount((c) => Math.max(0, c - 1))
    );
    const loading = loadingCount > 0;
    console.log(loading);

    return (
        <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}

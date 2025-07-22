import { useState, useEffect } from "react";

// Takes an arguments then debounces it. then returns the arguments after debounce
export default function useDebounce(value, delay = 1000) {
    const [debounce, setDebounce] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounce(value.trim() !== "" ? value : "");
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounce;
}

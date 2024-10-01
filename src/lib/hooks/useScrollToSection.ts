'use client'
import { useEffect, useState } from 'react';

export function useScroll() {
    const [scrollY, setScrollY] = useState<number>(0);
    const [prevScrollY, setPrevScrollY] = useState<number>(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        setPrevScrollY(scrollY);
    }, [scrollY]);

    return { scrollY, prevScrollY };
}
import React, { useEffect, useRef } from "react";
import Stats from 'stats.js';

const StatsComponent = () => {
    const statsRef = useRef();

    useEffect(() => {
        const stats = new Stats();
        stats.showPanel(0); // 0: fps
        statsRef.current.appendChild(stats.dom)

        const animate = () => {
            stats.begin();
            stats.end();
            requestAnimationFrame(animate);
        }
        animate();

        return () => statsRef.current.removeChild(stats.dom);
    }, [])

    return (
        <div
            ref={statsRef}
        />
    )
};

export default StatsComponent
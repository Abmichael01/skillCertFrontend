// import { Brain } from "lucide-react";
// import React from "react";

// const DynamicBanner = () => {
//     const tailwindColors = [
//         "red", "green", "blue", "indigo", "purple", "pink", "black", "stone", "orange", "emerald", "teal", "cyan", "sky", "violet", "fuchsia", "rose"
//     ];

//     function randomColor(): string {
//         const randomIndex = Math.floor(Math.random() * tailwindColors.length);
//         return tailwindColors[randomIndex];
//     }

//     return (
//         <div className={`w-full h-full flex flex-col items-center gap-3 justify-center flex-wrap overflow-hidden p-5 bg-${randomColor()}-300`}>
//             <Brain className="text-zinc-600 w-[40px] h-[40px]" />
//             <h1>SkillCert</h1>
//         </div>
//     );
// }

// export default DynamicBanner;

"use client"

import { Brain } from "lucide-react";
import React, { useState, useEffect } from "react";

const DynamicBanner = () => {
    const tailwindColors = [
        "red", "green", "blue", "indigo", "purple", "pink", "black", "stone", "orange", "emerald", "teal", "cyan", "sky", "violet", "fuchsia", "rose"
    ];

    // State to store the random color
    const [bgColor, setBgColor] = useState<string>("");

    useEffect(() => {
        // Check if a color is already stored in localStorage
        const storedColor = localStorage.getItem("bannerColor");

        if (storedColor) {
            // If a color is stored, use it
            setBgColor(storedColor);
        } else {
            // If no color is stored, generate a new random color and save it
            const randomIndex = Math.floor(Math.random() * tailwindColors.length);
            const newColor = tailwindColors[randomIndex];
            setBgColor(newColor);
            localStorage.setItem("bannerColor", newColor);
        }
    }, []);

    return (
        <div className={`w-full h-full flex flex-col items-center gap-3 justify-center flex-wrap overflow-hidden p-5 bg-gray-200`}>
            <Brain className="text-zinc-600 w-[40px] h-[40px]" />
            <h1>SkillCert</h1>
        </div>
    );
}

export default DynamicBanner;



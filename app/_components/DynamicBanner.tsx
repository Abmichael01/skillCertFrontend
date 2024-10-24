import { Brain } from "lucide-react";
import React from "react";

const DynamicBanner = () => {
    // const tailwindColors = [
    //     "red", "green", "blue", "indigo", "purple", "pink", "black", "stone", "orange", "emerald", "teal", "cyan", "sky", "violet", "fuchsia", "rose"
    // ];

    // function randomColor(): string {
    //     const randomIndex = Math.floor(Math.random() * tailwindColors.length);
    //     return tailwindColors[randomIndex];
    // }

    return (
        <div className={`w-full h-full flex flex-col items-center gap-3 justify-center flex-wrap overflow-hidden p-5 bg-gray-300`}>
            <Brain className="text-zinc-600 w-[40px] h-[40px]" />
            <h1>SkillCert</h1>
        </div>
    );
}

export default DynamicBanner;


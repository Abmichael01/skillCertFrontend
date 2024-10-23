import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { Lobster, Pacifico, Cinzel, Bebas_Neue, Playfair_Display } from "next/font/google";

const font = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap"
})

const Logo = () => {
  return (
    <div>
      <Link href="/" className={cn(
        "text-2xl font-bold ",
        font.className
      )}>
        Skill<span className="text-primary font-extrabold">Cert</span>
      </Link>
    </div>
  );
};

export default Logo;

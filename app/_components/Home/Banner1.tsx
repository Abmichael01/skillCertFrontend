import { File } from "lucide-react";
import React from "react";
import Link from "next/link";

const Banner1 = () => {
  return (
    <div className="bg-neutral-950 min-h-56  mt-20 p-12 md:p-20 flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
      <div className="flex flex-col gap-14 bg-gradient-to-r from-neutral-50 to-blue-500 bg-clip-text text-transparent">
        <h1 className="md:text-7xl text-3xl max-w-[60%] font-bold font-cinzel">
          Certification Made <span className="">Easy...</span>
        </h1>
        <h1 className="md:text-4xl text-xl font-semibold font-cinzel">
          With Skill<span className="">Cert</span>
        </h1>
        {/* <Link href="/auth/register" className="border-2 border-primary rounded-md text-white text-[16px] px-6 py-[8px] w-fit hover:bg-primary transition">Register Now</Link> */}
      </div>

      <div className="animate-bounce text-gray-400">
        <File width={150} height={150}/>
      </div>
    </div>
  );
};

export default Banner1;

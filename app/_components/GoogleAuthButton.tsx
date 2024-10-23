import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa"

const GoogleAuthButton = () => {
  return (
    <div className='flex flex-col items-center gap-5'>
        <div className="flex items-center gap-2 w-full">
            <hr className="w-full " />
            or
            <hr className="w-full " />
        </div>
        <Link href="#" className="w-full">
            <Button variant="outline" className="flex items-center gap-3 w-full border-primary text-primary hover:text-primary hover:bg-primary-100">
                <FaGoogle/>
                Continue with Google
            </Button>
        </Link>
    </div>
  )
}

export default GoogleAuthButton

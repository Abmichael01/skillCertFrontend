"use client"

import { useAuthStore, useUserStore } from '@/app/_stores'
import { Button } from '@/components/ui/button'
import { ArrowBigRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  const isAuth = useAuthStore(state=>state.isAuthenticated)
  return (
    <div className='flex items-center justify-center flex-col gap-2'>
        <h2 className='text-5xl text-center font-bold'>Take A Test <br /> <span className='text-primary text-5xl'>Earn A Free</span> Certificate</h2>
        <p className='font-semibold text-zinc-500 text-center'>You can now apply to your dream career confidently</p>
        <div className='flex flex-col sm:flex-row items-center gap-5 sm:gap-10 mt-4'>
            {!isAuth && <Link href="/auth/signup">
              <button className='px-5 py-2 bg-primary text-white rounded-md'>Get Started Now</button>
            </Link>}
            <Link href="/category/1">
              <Button variant={`outline`} className='flex items-center gap-4'>Explore Tests <ArrowRight /> </Button>
            </Link>
        </div>
    </div>
  )
}

export default Hero
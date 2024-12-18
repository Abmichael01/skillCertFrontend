"use client"

import React, { useState } from 'react'
import { ActivationData } from '../_types'
import { useActivationMutation } from '../_dataOperations/mutations/authMutations'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { BookMarked, CheckCircle } from 'lucide-react'

const Activation = () => {
    const pathname = usePathname()
    const ids = pathname.split("/")
    const [countdown, setCountdown] = useState(5)
    const router = useRouter()

    const data = {
        uid: ids[3],
        token: ids[4],
    }


    const {isPending, mutate, isSuccess, isError, error} = useActivationMutation()
    
    const handleActivation =() => {
        mutate(data)
    }

    if (isPending) return <div className='flex flex-col items-center gap-5 text-lg text-center'>
      <img src="/activating.png" alt="" className="vsm:w-[250px] w-full" />
      <p className='text-lg text-center bg-gradient-to-r from-blue-800 via-gray-800 to-blue-500 bg-clip-text text-transparent'>Please wait while we verify your account...</p>
    </div>

    if (isError) return <div className='flex flex-col items-center gap-5 text-lg text-center'>
      <img src="/activating.png" alt="" className="vsm:w-[250px] w-full" />
      <p className='text-lg text-center bg-gradient-to-r from-blue-800 via-gray-800 to-blue-500 bg-clip-text text-transparent'>Opps... Something went worng</p>
    </div>

    if (isSuccess) {
      setInterval(()=>{
        setCountdown(countdown-1)
      }, 1000)
      setTimeout(()=>{
        router.push("/auth/login")
      }, 5000)
      return (
        <div className='flex flex-col items-center text-lg text-center font-bold'>
          <CheckCircle className='w-28 h-28 text-emerald-600' />
          <p>Account activated successfully</p>
          <p>You will redirected to the login page in {countdown}s </p>
        </div>
      )
    }


  return (
    <div className='flex flex-col items-center gap-5 font-bold'>
      <img src="/activate.png" alt="" className="vsm:w-[250px] w-full" />
      <Button onClick={handleActivation}>Activate Account</Button>
    </div>
  )
}

export default Activation

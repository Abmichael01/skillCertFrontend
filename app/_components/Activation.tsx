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


    const {isPending, mutate, isSuccess} = useActivationMutation()
    
    const handleActivation =() => {
        mutate(data)
    }

    if (isPending) return <div>
      <img src="activating.png" alt="" />
      <p className='text-lg text-center'>Please wait while we verify your account...</p>
    </div>

    if (isSuccess) {
      setInterval(()=>{
        setCountdown(countdown-1)
      }, 1000)
      setTimeout(()=>{
        router.push("/auth/login")
      }, 5000)
      return (
        <div className='flex flex-col items-center'>
          <CheckCircle className='w-28 h-28 text-emerald-600' />
          <p>Account activated successfully</p>
          <p>You will redirected to the login page in {countdown}s </p>
        </div>
      )
    }


  return (
    <div>
      <img src="activate.png" alt="" />
      <Button onClick={handleActivation}>Activate Account</Button>
    </div>
  )
}

export default Activation

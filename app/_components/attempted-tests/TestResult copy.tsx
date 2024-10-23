"use client"

import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"

const TestResult = () => {
    const  percent = useRef<HTMLDivElement | null>(null)
    const width = percent?.current?.style.width
    
    return (
        <div className=" p-5 flex flex-col items-center">
            <h1 className="font-semibold mb-3 text-xl">Congratulations</h1>
            <h1 className="font-semibold">You Got:</h1>
            <p className="text-[150px] percent-text text-primary font-bold animation-fade-in">85%</p>
            <div className="w-[600px] rounded-full h-5 border border-primary-500 border-1.5 shadow-lg">
                <div ref={percent} className="w-[85%] percent bg-primary-500 h-full relative rounded-full">
                    <div className="absolute left-[95%] top-[120%] w-14 h-14 rounded-full flex items-center justify-center bg-primary text-white shadow-xl ">85%</div>
                </div>
            </div>
            <div className="flex gap-10 mt-20">
                <Button className="text-lg">
                    To Certificate
                </Button>
                <Button className="border text-lg border-zinc-300 text-zinc-600 hover:bg-white bg-white">
                    My Answers
                </Button>
            </div>
            <hr className="mt-10 border-zinc-400" />
        </div>
    )
}

export default TestResult

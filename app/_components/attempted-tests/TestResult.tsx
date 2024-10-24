"use client"

import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import Answers from './Answers'
import AnswersNav from './AnswersNav'
import Image from "next/image"

const TestResult = ({score}: {score: number}) => {
    const [percent, setPercent] = useState(score)
    
    
    return (
        <div className=" p-5 flex flex-col items-center">
            <Image src="/congrats.png" width={300} height={300} alt="Congratulations" className="vsm:w-[250px] w-full" />
            <h1 className="font-semibold mb-3 text-xl">Congratulations</h1>
            <h1 className="font-semibold">You Got:</h1>
            <p className="text-[50px] percent-text text-primary font-bold animation-fade-in">{score}%</p>
            <div className="w-full sm:w-[600px] rounded-full h-4 border border-primary-500 border-1.5 shadow-md">
                <div style={{ width: `${score}%` }} className="bg-primary">
                    <div className="w-full percent bg-primary h-full relative rounded-full">
                        {/* <div className="absolute left-[95%] top-[120%] w-14 h-14 rounded-full flex items-center justify-center bg-primary text-white shadow-xl ">{score}%</div> */}
                    </div>
                </div>
            </div>
            <div className="flex gap-10 mt-20">
                <Button className="text-lg">
                    To Certification
                </Button>
                <Button className="border text-lg border-zinc-300 text-zinc-600 hover:bg-white bg-white">
                    My Answers
                </Button>
            </div>
            
        </div>
    )
}

export default TestResult

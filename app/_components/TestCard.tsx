"use client"

import React from 'react';
import { Test } from '../_types';
import DynamicBanner from './DynamicBanner';
import { Brain, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import SearchHighlighter from './search/SearchHighlighter';


interface TestCardProp {
	test: Test;
	index: number;
}

const TestCard = ({ test, index }: TestCardProp ) => {
  const searchParams = useSearchParams()
  const query = searchParams.get("query") as string
    return (
        <div
            key={index}
            className={`border border-zinc-300  p-3 rounded-md shadow-sm group cursor-pointer flex flex-col justify-between w-full`}
          >

            <div className={`w-full h-[200px] md:h-40 border rounded-md overflow-hidden  `} >
              {test.banner !== null ? (
                <Image
                  src={test.banner || ""}
                  width={50}
                  height={50}
                  alt="anything"
                  className="w-full h-full object-cover group-hover:scale-105 transition "
                />
              ) : (
                <DynamicBanner />
              )}

            </div>
            <div className="flex flex-col mt-2 gap-2">
              {query ? (
                <SearchHighlighter query={query}>
                  <h1 className="font-semibold text-lg">{test.title}</h1>
                </SearchHighlighter>
                ) : (
                <h1 className="font-semibold text-lg">{test.title}</h1>
              )}
              <div className="flex items-center justify-between text-sm">
                <span>{test.duration}mins</span>
                <p className="flex items-center gap-2 cursor-pointer">
                  <ThumbsUp className="w-[15px]" />
                  67
                </p>
              </div>

              <div className="flex justify-between text-sm items-center">
                <p>Difficulty</p>
                {test.difficulty === "S" && (
                  <p className="px-3 py-[1px] rounded-md border border-green-500 bg-green-100 text-green-500 text-[12px]">
                    Simple
                  </p>

                )}
                {test.difficulty === "M" && (
                  <p className="px-3 py-[1px] rounded-md border border-yellow-500 bg-yellow-100 text-yellow-500 text-[12px]">
                    Moderate
                  </p>
                )}
                {test.difficulty === "H" && (
                  <p className="px-3 py-[1px] rounded-md border border-red-500 bg-red-100 text-red-500 text-[12px]">
                    Hard
                  </p>
                )}
              </div>
            </div>
            <Link
              href={`/tests/${test.slug}`}
              className="w-full text-center text-[16px] bg-primary hover:bg-primary-600 transition text-white flex items-center justify-center rounded-md mt-5 gap-2 py-3 group"
            >
              <Brain className="" />
              Attempt Test
            </Link>
          </div>
    );
};

export default TestCard;
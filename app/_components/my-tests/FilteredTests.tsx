import React from 'react'
import { Test as TestType } from "@/app/_types"
import Test from "./Test"
import NoDataFound from '../NoDataFound'
import { Skeleton } from '@/components/ui/skeleton'

const FilteredTests = ({ tests, isPending }: { tests: TestType[]; isPending: boolean; }) => {
  return (
    <div>
      {tests.map((test, index) => (
        <div key={index}>
          <Test test={test} />
        </div>
      ))}
      <div className='flex flex-col gap-5' mt-1>
      	{isPending && (
      		Array.from({length: 8}).map((_, index)=>(
      			<div key={index}>
	      			<Skeleton className="h-[40px]" />
	      		</div>
      		))
      	)}
      </div>
      { (!isPending && tests.length === 0) && <NoDataFound information="You have no public test" />}
    </div>
  )
}

export default FilteredTests;
import React from 'react'
import { Test as TestType } from "@/app/_types"
import Test from "./Test"
import NoDataFound from '../NoDataFound'



const PublicTests = ({ tests }: { tests: TestType[] }) => {
  return (
    <div>
      {tests.map((test, index) => (
        <div key={index}>
          <Test test={test} />
        </div>
      ))}
      {tests.length === 0 && <NoDataFound information="You have no public test" />}
    </div>
  )
}

export default PublicTests

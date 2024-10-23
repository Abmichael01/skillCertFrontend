import React from 'react'
import { Test as TestType } from "@/app/_types"
import Test  from "./Test"
import NoDataFound from '../NoDataFound'

const DraftTests = ({tests}:{tests: TestType[]}) => {
  return (
    <div>
      {tests.map((test, index)=>(
        <Test test={test} />
      ))}
      {tests.length === 0 && <NoDataFound information="You have no draft" />}
    </div>
  )
}

export default DraftTests

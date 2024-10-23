import React from 'react'



const MainPaddingLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className='2xl:px-[15%] lg:px-20 md:px-12 vsm:px-5 px-3'>
        {children}
    </div>
  )
}

export default MainPaddingLayout
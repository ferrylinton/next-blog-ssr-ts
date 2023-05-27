import React, { PropsWithChildren } from 'react'



const DataContainer = (props: PropsWithChildren) => {
    return (
        <div className='w-full h-full flex flex-col px-2 sm:px-5 '>
            <div className='w-full h-full flex flex-col justify-center items-center py-0 sm:py-8 bg-white box'>
                <div className='flex flex-col justify-center items-center w-full px-0 sm:px-5'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default DataContainer
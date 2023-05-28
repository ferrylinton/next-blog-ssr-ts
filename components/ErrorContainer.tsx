import React from 'react'

const ErrorContainer = ({ code, message }: ErrorResponseType) => {
    return (
        <div className='w-full h-full flex flex-col px-2 sm:px-5 '>
            <div className='w-full h-full flex flex-col justify-center items-center py-0 sm:py-8 bg-red-50 border border-red-200 rounded'>
                <div className='flex flex-col justify-center items-center w-full px-0 sm:px-5 gap-2'>
                    <div className='text-red-700 font-bold text-3xl'>{code}</div>
                    <div className='text-red-700'>{message}</div>
                </div>
            </div>
        </div>
    )
}

export default ErrorContainer
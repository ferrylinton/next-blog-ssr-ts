import WarningIcon from '@/icons/WarningIcon'
import React from 'react'
import Breadcrumb from './Breadcrumb'

const ErrorContainer = ({ code, message }: ErrorInfoType) => {
    return (
        <>
        <Breadcrumb label={'Error'} />
        <div className='w-full h-full flex flex-col px-2 sm:px-5 '>
            <div className='w-full h-full flex flex-col justify-center items-center py-0 sm:py-8 bg-red-50 border border-red-200 rounded'>
                <div className='flex flex-col justify-center items-center w-full px-0 sm:px-5 gap-2'>
                    <WarningIcon className='text-red-600 w-20 h-20 sm:w-24 sm:h-24' />
                    <div className='text-red-700 font-bold text-2xl'>{code}</div>
                    <div className='text-red-700 text-center px-1'>{message}</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ErrorContainer
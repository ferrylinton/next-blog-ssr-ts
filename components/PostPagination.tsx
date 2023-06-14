import NextIcon from '@/icons/NextIcon'
import PreviousIcon from '@/icons/PreviousIcon'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    page: number,
    totalPage: number
}

function PostPagination({ page, totalPage }: Props) {

    const router = useRouter();

    const handleOnClickPrevious = () => {
        if (page > 1) {
            router.push(`${router.pathname}?page=${page - 1}`);
        }
    }

    const handleOnClickNext = () => {
        if (page < totalPage) {
            router.push(`${router.pathname}?page=${page + 1}`);
        }
    }

    return (
        <div className='px-3'>
            <div className='w-full flex flex-wrap justify-between items-center px-3 sm:px-0 my-3 gap-3'>
                <div className='flex flex-row gap-1 justify-between items-center'>
                    <button
                        onClick={() => handleOnClickPrevious()}
                        type="button" className={`group flex justify-center items-center w-[90px] h-10 leading-none border rounded ${page > 1 ? `bg-white hover:bg-gray-100  border-slate-400` : `bg-slate-100  border-slate-300  cursor-not-allowed`} `}>
                        <PreviousIcon className={`h-[22px] ${page > 1 ? 'text-slate-500 group-hover:text-slate-700' : 'text-slate-400'}`} />
                    </button>
                    <button
                        onClick={() => handleOnClickNext()}
                        type="button" className={`group flex justify-center items-center w-[90px] h-10 leading-none border rounded ${page < totalPage ? `bg-white hover:bg-gray-100  border-slate-400` : `bg-slate-100  border-slate-300  cursor-not-allowed`} `}>
                        <NextIcon className={`h-[22px] ${page < totalPage ? 'text-slate-500 group-hover:text-slate-700' : 'text-slate-400'}`} />
                    </button>
                    <div className='ps-3'>Page {page} of {totalPage}</div>
                </div>
            </div>
        </div>
    )
}

export default PostPagination
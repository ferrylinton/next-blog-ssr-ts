import NextIcon from '@/icons/NextIcon'
import PreviousIcon from '@/icons/PreviousIcon'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    keyword: string,
    page: number,
    totalPage: number,
    formPageUrl: string
}

function DataToolbar({ keyword, page, totalPage, formPageUrl }: Props) {

    const router = useRouter();

    const handleOnClickPrevious = () => {
        if (page > 1) {
            if (keyword.trim() === '')
                router.push(`${router.pathname}?page=${page - 1}`);
            else
                router.push(`${router.pathname}?keyword=${keyword}&page=${page - 1}`);
        }
    }

    const handleOnClickNext = () => {
        if (page < totalPage) {
            if (keyword.trim() === '')
                router.push(`${router.pathname}?page=${page + 1}`);
            else
                router.push(`${router.pathname}?keyword=${keyword}&page=${page - 1}`);
        }
    }

    return (
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

            <Link href={formPageUrl}
                className="group flex justify-center items-center w-[120px] h-10 bg-white hover:bg-slate-100 py-2 leading-none border border-slate-400 rounded">
                <span className='text-slate-500 group-hover:text-slate-700'>Add</span>
            </Link>
        </div>
    )
}

export default DataToolbar
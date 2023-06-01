import Link from 'next/link'
import React from 'react'

type Props = {
    totalData: number,
    formPageUrl: string
}

function DataToolbar({ totalData, formPageUrl }: Props) {
    return (
        <div className='w-full flex justify-between items-center px-3 sm:px-0 my-3'>
            <div>Total data : {totalData}</div>
            <Link href={formPageUrl}
                className="group text-center w-[120px] bg-white hover:bg-slate-100 py-2 leading-none border border-slate-400 rounded">
                <span className='text-slate-500 group-hover:text-slate-700'>Add</span>
            </Link>
        </div>
    )
}

export default DataToolbar
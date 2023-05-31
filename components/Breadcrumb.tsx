import ArrowRightIcon from '@/icons/ArrowRightIcon'
import HomeIcon from '@/icons/HomeIcon'
import Link from 'next/link'
import React from 'react'

const Breadcrumb = ({ items }: BreadcrumbItems) => {

    if (Array.isArray(items))
        return <div className='flex-none flex justify-start items-center text-sm gap-2 ps-7 py-4 uppercase mt-[50px] lg:mt-0'>
            <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
            {
                items.map((item, index) => {
                    if (item.link) {
                        return <div key={index} className='flex justify-start items-center gap-2'>
                            <ArrowRightIcon className='w-3 h-3' />
                            <Link href={item.link}>{item.label}</Link>
                        </div>
                    } else {
                        return <div key={index} className='flex justify-start items-center gap-2'>
                            <ArrowRightIcon className='w-3 h-3' />
                            <span>{item.label}</span>
                        </div>
                    }

                })
            }
        </div>
    else
        return (
            <div className='flex-none flex justify-start items-center text-sm gap-2 ps-7 py-4 uppercase mt-[50px] lg:mt-0'>
                <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
                <div className='flex justify-start items-center gap-2'>
                    <ArrowRightIcon className='w-3 h-3' />
                    <span>{items}</span>
                </div>
            </div>
        )

}

export default Breadcrumb
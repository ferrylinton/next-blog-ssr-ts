import { PropsWithChildren } from 'react'

const SimpleBox = (props: PropsWithChildren) => {
    return (<div className='w-full h-full flex flex-col mt-[50px] p-2 lg:mt-0 lg:p-5 '>
        <div className='w-full h-full flex justify-center items-center bg-white border border-slate-300 rounded'>
            {props.children}
        </div>
    </div>)
}

export default SimpleBox
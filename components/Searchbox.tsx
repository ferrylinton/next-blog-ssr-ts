import ReloadIcon from '@/icons/ReloadIcon'
import SearchIcon from '@/icons/SearchIcon'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Props = {
    keyword?: string
}

const Searchbox = (props: Props) => {

    const router = useRouter();

    const [keyword, setKeyword] = useState(props.keyword);

    const handleOnChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(value);
    };

    const handleReload = () => {
        setKeyword('');
        router.push(`${router.pathname}`);
    }

    return (
        <div className='w-full md:w-[400px] flex justify-center items-center gap-1 py-4 px-3 sm:px-0'>
            <form
                action={router.pathname}
                method='GET'
                noValidate
                autoComplete='off'
                className='flex w-full '>

                <div className="relative flex w-full h-10 grow rounded">
                    <input type="text"
                        name="keyword"
                        placeholder="keyword"
                        value={keyword}
                        onChange={handleOnChange}
                        className="w-full px-5  border border-slate-300  pr-10 text-sm rounded focus:outline-none focus:ring-4" />
                    <button type="submit" className="absolute top-0 right-0 h-full px-4 text-slate-400 hover:text-slate-600">
                        <SearchIcon className='w-[20px]' />
                    </button>
                </div>

            </form>
            <button className='flex-none flex justify-center items-center h-10 w-[50px] border border-slate-300 rounded' onClick={() => handleReload()}>
                <ReloadIcon className='w-[20px] h-[20px] text-slate-400 hover:text-slate-600' />
            </button>
        </div>
    )
}

export default Searchbox
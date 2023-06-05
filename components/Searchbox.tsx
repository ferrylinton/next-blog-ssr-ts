import ReloadIcon from '@/icons/ReloadIcon'
import SearchIcon from '@/icons/SearchIcon'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

type Props = {
    keyword: string | null
}

const Searchbox = (props: Props) => {

    const router = useRouter();

    const [keyword, setKeyword] = useState(props.keyword || '');

    const handleOnChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(value);
    };

    const handleReload = () => {
        setKeyword('');
        router.push(`${router.pathname}`);
    }

    return (
        <div className='w-full sm:w-[300px] flex justify-center items-center gap-2 border-b border-slate-300 p-3 sm:p-0 sm:border-b-0 mb-3'>
            <form
                action={router.pathname}
                method='GET'
                noValidate
                autoComplete='off'
                className='border border-slate-400 w-full rounded'>

                <div className="flex">
                    <input type="text"
                        name="keyword"
                        placeholder="keyword"
                        value={keyword}
                        onChange={handleOnChange}
                        className="grow h-10 px-5 pr-10 text-sm rounded focus:outline-none active:bg-white" />
                    <button type="submit" className="flex-none w-[50px] px-4">
                        <SearchIcon className='w-[20px] h-[20px]' />
                    </button>
                </div>

            </form>
            <button onClick={() => handleReload()}>
                <ReloadIcon className='w-[28px] h-[28px] text-slate-400 hover:text-slate-600' />
            </button>
        </div>
    )
}

export default Searchbox
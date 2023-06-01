import React from 'react'

type Props = {
    onCancelHandler: () => void
}

const FormButtons = ({ onCancelHandler }: Props) => {
    return (
        <div className="mt-5 text-center flex gap-1">
            <button
                onClick={onCancelHandler}
                type='button'
                className="group w-full bg-white hover:bg-slate-100 py-2 px-4 border border-slate-400 rounded">
                <span className='font-semibold text-slate-500 group-hover:text-slate-700'>Cancel</span>
            </button>

            <button
                type="submit"
                className="group w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-blue-800 rounded">
                <span className='font-semibold text-slate-200 group-hover:text-white'>Save</span>
            </button>
        </div>
    )
}

export default FormButtons
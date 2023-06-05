import React from 'react'

type Props = {
  colSpan: number
}

const EmptyDataRow = ({ colSpan }: Props) => {
  return <tr>
    <td className='actions hover:bg-white' colSpan={colSpan}>
      <div className='mx-2 sm:mx-0 my-5 sm:my-2 py-2 text-center border border-slate-300 rounded'>Data is empty</div>
    </td>
  </tr>
}

export default EmptyDataRow
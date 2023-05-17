import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import Link from 'next/link';
import React from 'react';
import { Righteous } from 'next/font/google'

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400'
})


type Props = {}

const TagPage = (props: Props) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center px-4 sm:px-0'>
        <div className={`mt-3 mb-9 text-center uppercase text-2xl ` + righteous.className}>Tag - List</div>
        <table className='table-responsive w-full max-w-2xl'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Name</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="#">1</td>
              <td data-label="Name">ReactJS</td>
              <td data-label="Name">ReactJS</td>
              <td data-label="Name">ReactJS</td>
              <td className='actions'>
                <div className='btn-box'>
                  <button className='btn-edit'><EditIcon /></button>
                  <button className='btn-delete'><DeleteIcon /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td data-label="#">1</td>
              <td data-label="Name">ReactJS</td>
              <td data-label="Name">ReactJS</td>
              <td data-label="Name">ReactJS</td>
              <td className='actions'>
                <div className='btn-box'>
                  <button className='btn-edit'><EditIcon /></button>
                  <button className='btn-delete'><DeleteIcon /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td data-label="#">1</td>
              <td data-label="Name">ReactJS</td>
              <td data-label="Name">ReactJS</td>
              <td data-label="Name">ReactJS</td>
              <td className='actions'>
                <div className='btn-box'>
                  <button className='btn-edit'><EditIcon /></button>
                  <button className='btn-delete'><DeleteIcon /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className='w-full max-w-2xl flex justify-between items-center'>
          <div>Total data : 15</div>
          <button
            className="w-[100px] h-[40px] my-3 text-gray-600 hover:text-gray-600 border border-gray-300  rounded cursor-pointer transition duration-500 bg-gradient-to-tl from-gray-100 via-gray-50 to-white bg-size-200 bg-pos-0 hover:bg-pos-100"
            type="submit">
            <span className={`uppercase font-bold tracking-wide ${righteous.className}`}>ADD</span>
          </button>
        </div>


      </div>
    </>
  )
}

export default TagPage
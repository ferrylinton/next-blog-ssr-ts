import React, { useState } from 'react';

type Props = {}

const PostForm = (props: Props) => {

  const onChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(value);
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='w-full max-w-3xl'>
          <form noValidate autoComplete='off' className='w-full'>
            <textarea rows={15}

              onChange={onChange}
              className=" p-2
          font-mono
          overflow-auto
          whitespace-pre
          border-solid
          border
          border-gray-300
          resize
          w-full
        "
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default PostForm
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import Link from 'next/link';
import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useAppContext } from '@/context';
import HomeIcon from '@/icons/HomeIcon';
import ArrowRightIcon from '@/icons/ArrowRightIcon';

type Props = {
  tags: TagType[],
  error: ErrorResponseType | null;
}

const TagPage = ({ tags, error }: Props) => {

  const { showSuccessToast, showErrorToast } = useAppContext();

  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState('');

  const [message, setMessage] = React.useState('');

  const onClickEditHandler = (id: string) => {
    router.push(`/tag/form/${id}`)
  }

  const onClickDeleteHandler = (id: string) => {
    setMessage(`Delete tag with id = ${id}`);
    setId(id);
    setOpen(true);
  }

  const callDeleteApi = async () => {
    const response = await fetch(`http://localhost:3000/api/tags/${id}`, { method: 'DELETE' });

    if (response.status === 200) {
      refreshData();
      showSuccessToast(`Data is deleted`);
    } else {
      let error: ErrorResponseType = await response.json();
      showErrorToast(error?.message);
    }

  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center px-4 sm:px-0'>
        <div className={`mt-3 mb-9 text-center uppercase text-2xl font-righteous`}>Tag - List</div>
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-600">
          <span className="inline-block align-middle mr-8">{error.message}</span>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className='breadcrumb flex-none flex justify-start items-center gap-3 ps-5 uppercase py-2 bg-slate-100 border-b border-slate-200 mt-[50px] lg:mt-0'>
          <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
          <ArrowRightIcon className='w-3 h-3' />
          <span>Tag</span>
        </div>
        <div className='w-full h-full flex flex-col'>
          <div className='grow flex flex-col justify-center items-center w-full px-3 lg:px-0 py-8'>
            <div className='flex flex-col justify-center items-center w-full max-w-3xl px-0 sm:px-5'>
              <div className='w-full  p-0 sm:p-3  rounded sm:border border-slate-400 sm:bg-white'>
                <table className='table-responsive w-full'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tags.map((tag, index) => {
                        return <tr key={tag.id}>
                          <td data-label="#">{index + 1}</td>
                          <td data-label="Name">{tag.name}</td>
                          <td className='actions'>
                            <div className='btn-box'>
                              <button className='btn-edit' onClick={() => onClickEditHandler(tag.id)}><EditIcon /></button>
                              <button className='btn-delete' onClick={() => onClickDeleteHandler(tag.id)}><DeleteIcon /></button>
                            </div>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className='w-full flex justify-between items-center my-3'>
                <div>Total data : 15</div>
                <Link href="/tag/form" className='btn btn-default  w-[120px]'>ADD</Link>
              </div>
            </div>
          </div>
        </div>
        <ConfirmDialog open={open} setOpen={setOpen} message={message} callback={callDeleteApi} />
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    let tags: TagType[] = [];
    let error: ErrorResponseType | null = null;

    const response = await fetch(`http://localhost:3000/api/tags`);

    if (response.status === 200) {
      tags = await response.json();
    } else {
      error = await response.json();
    }

    return {
      props: { tags, error }
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {}
    };
  }
};

export default TagPage
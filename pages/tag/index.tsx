import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import Link from 'next/link';
import React from 'react';
import { Righteous } from 'next/font/google'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useAppContext } from '@/context';

const righteous = Righteous({
  subsets: ['latin'],
  weight: '400'
})


type Props = {
  tags: TagType[],
  error: ErrorResponseType | null;

}



const TagPage = ({ tags, error }: Props) => {

  const { AlertSuccess } = useAppContext();

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
      AlertSuccess(`Data is deleted`);
    } else {
      let error: ErrorResponseType | null = await response.json();
      alert(error?.message);
    }

  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  if (error) {
    return (
      <div className='flex flex-col justify-center items-center px-4 sm:px-0'>
        <div className={`mt-3 mb-9 text-center uppercase text-2xl ` + righteous.className}>Tag - List</div>
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-600">
          <span className="inline-block align-middle mr-8">{error.message}</span>
        </div>
      </div>
    )
  } else {
    return (
      <>

        <div className='flex flex-col justify-center items-center px-4 sm:px-0'>
          <div className={`mt-3 mb-9 text-center uppercase text-2xl ` + righteous.className}>Tag - List</div>
          <table className='table-responsive w-full max-w-2xl'>
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

          <div className='w-full max-w-2xl flex justify-between items-center my-3'>
            <div>Total data : 15</div>
            <Link href="/tag/form">
              <span className={`inline-block w-[100px] py-2 text-center text-gray-600 hover:text-gray-600 border border-gray-300  rounded cursor-pointer transition duration-500 bg-gradient-to-tl from-gray-100 via-gray-50 to-white bg-size-200 bg-pos-0 hover:bg-pos-100 uppercase font-bold tracking-wide ${righteous.className}`}>ADD</span>
            </Link>
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
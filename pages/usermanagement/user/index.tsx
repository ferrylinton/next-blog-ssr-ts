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
import DataContainer from '@/components/DataContainer';

type Props = {
  users: UserType[],
  error: ErrorResponseType | null;
}

const UserPage = ({ users, error }: Props) => {

  const { showSuccessToast, showErrorToast } = useAppContext();

  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState('');

  const [message, setMessage] = React.useState('');

  const onClickEditHandler = (id: string) => {
    router.push(`${process.env.HOST}/user/form/${id}`)
  }

  const onClickDeleteHandler = (id: string) => {
    setMessage(`Delete user with id = ${id}`);
    setId(id);
    setOpen(true);
  }

  const callDeleteApi = async () => {
    const response = await fetch(`${process.env.HOST}/api/users/${id}`, { method: 'DELETE' });

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
        <div className={`mt-3 mb-9 text-center uppercase text-2xl font-righteous`}>User - List</div>
        <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-600">
          <span className="inline-block align-middle mr-8">{error.message}</span>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <div className='flex-none flex justify-start items-center text-sm gap-2 ps-7 py-4 uppercase mt-[50px] lg:mt-0'>
          <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
          <ArrowRightIcon className='w-3 h-3' />
          <span>User</span>
        </div>
        <DataContainer>
          <div className='w-full p-0 sm:p-3 rounded sm:border sm:bg-slate-50 border-slate-300'>
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
                  users.map((user, index) => {
                    return <tr key={user.id}>
                      <td data-label="#">{index + 1}</td>
                      <td data-label="Email">{user.email}</td>
                      <td className='actions'>
                        <div className='btn-box'>
                          <button className='btn-edit' onClick={() => onClickEditHandler(user.id)}><EditIcon /></button>
                          <button className='btn-delete' onClick={() => onClickDeleteHandler(user.id)}><DeleteIcon /></button>
                        </div>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
          <div className='w-full flex justify-between items-center px-5 my-3'>
            <div>Total data : 15</div>
            <Link href="/user/form"
              className="group text-center w-[150px] bg-white hover:bg-slate-100 py-2 px-4 border border-slate-400 rounded">
              <span className='font-semibold text-slate-500 group-hover:text-slate-700'>Add</span>
            </Link>
          </div>
        </DataContainer>
        <ConfirmDialog open={open} setOpen={setOpen} message={message} callback={callDeleteApi} />
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    let users: UserType[] = [];
    let error: ErrorResponseType | null = null;

    const response = await fetch(`${process.env.HOST}/api/users`);

    if (response.status === 200) {
      users = await response.json();
    } else {
      error = await response.json();
    }

    return {
      props: { users, error }
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {}
    };
  }
};

export default UserPage
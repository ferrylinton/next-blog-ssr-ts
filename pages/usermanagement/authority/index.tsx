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
import ErrorContainer from '@/components/ErrorContainer';

type Props = {
  authorities: AuthorityType[],
  error: ErrorResponseType | null;
}

const Breadcrumb = <div className='flex-none flex justify-start items-center text-sm gap-2 ps-7 py-4 uppercase mt-[50px] lg:mt-0'>
  <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
  <ArrowRightIcon className='w-3 h-3' />
  <span>Authority</span>
</div>

const AuthorityPage = ({ authorities, error }: Props) => {

  const { showSuccessToast, showErrorToast } = useAppContext();

  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState('');

  const [message, setMessage] = React.useState('');

  const onClickEditHandler = (id?: string) => {
    router.push(`${process.env.NEXT_PUBLIC_HOST}/usermanagement/authority/form/${id}`)
  }

  const onClickDeleteHandler = (id: string = '') => {
    setMessage(`Delete authority with id = ${id}`);
    setId(id);
    setOpen(true);
  }

  const callDeleteApi = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/authorities/${id}`, { method: 'DELETE' });

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
      <>
        {Breadcrumb}
        <ErrorContainer code={error.code} message={error.message} />
      </>
    )
  } else {
    return (
      <>
        {Breadcrumb}
        <DataContainer>
          <div className='w-full p-0 sm:p-3 rounded sm:border border-slate-300'>
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
                  authorities.map((authority, index) => {
                    return <tr key={authority.id}>
                      <td data-label="#">{index + 1}</td>
                      <td data-label="Name">{authority.name}</td>
                      <td className='actions'>
                        <div className='btn-box'>
                          <button className='btn-edit' onClick={() => onClickEditHandler(authority.id)}><EditIcon /></button>
                          <button className='btn-delete' onClick={() => onClickDeleteHandler(authority.id)}><DeleteIcon /></button>
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
            <Link href="/usermanagement/authority/form"
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
    let authorities: AuthorityType[] = [];
    let error: ErrorResponseType | null = null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/authorities`);

    if (response.status === 200) {
      authorities = await response.json();
    } else {
      error = await response.json();
    }

    return {
      props: { authorities, error }
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {}
    };
  }
};

export default AuthorityPage
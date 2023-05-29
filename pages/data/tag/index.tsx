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
import * as tagService from "@/services/tag-service";
import ErrorContainer from '@/components/ErrorContainer';

type Props = {
  tags: TagType[],
  error: ErrorResponseType | null;
}

const Breadcrumb = <div className='flex-none flex justify-start items-center text-sm gap-2 ps-7 py-4 uppercase mt-[50px] lg:mt-0'>
  <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
  <ArrowRightIcon className='w-3 h-3' />
  <span>Tag</span>
</div>

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
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/tagss/${id}`, { method: 'DELETE' });
      const contentType = response.headers.get("content-type");

      console.log(contentType);

      if (response.status === 200) {
        refreshData();
        showSuccessToast(`Data is deleted`);
      } else {
        if (contentType && contentType.indexOf("application/json") !== -1) {
          let error = await response.json();
          console.log(error.message);
          showErrorToast(error.message);
        } else {
          let error = await response.text();
          showErrorToast(error);
        }
      }

    } catch (error: any) {
      console.log(error.message);
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
                  tags.length === 0 ?
                    <tr>
                      <td className='actions' colSpan={3}>
                        <div className='mx-2 sm:mx-0 mt-10 sm:mt-2 py-2 text-center bg-red-50 text-red-700 border border-red-300'>Data is not found</div>
                      </td>
                    </tr> :
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
          <div className='w-full flex justify-between items-center px-3 sm:px-0 my-3'>
            <div>Total data : {tags.length}</div>
            <Link href={`${process.env.NEXT_PUBLIC_HOST}/data/tag/form`}
              className="group text-center w-[120px] bg-white hover:bg-slate-100 py-2 leading-none border border-slate-400 rounded">
              <span className='text-slate-500 group-hover:text-slate-700'>Add</span>
            </Link>
          </div>
        </DataContainer>
        <ConfirmDialog open={open} setOpen={setOpen} message={message} callback={callDeleteApi} />
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {

    const tags = await tagService.findAllJson();

    return {
      props: {
        tags
      }
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      props: {
        error: {
          code: 500,
          message: error.message
        }
      }
    };
  }
};

export default TagPage
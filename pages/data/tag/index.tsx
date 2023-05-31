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
import { deleteClientApi } from '@/services/tag-http-client';
import { getLogger } from '@/utils/logger';

type Props = {
  tags: TagType[],
  error: ErrorResponseType | null;
}

const logger = getLogger('tag-index');

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

  const showDeleteConfirmation = (id: string) => {
    setMessage(`Delete tag with id = ${id}`);
    setId(id);
    setOpen(true);
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
                        <div className='mx-2 sm:mx-0 mt-10 sm:mt-2 py-2 text-center bg-red-50 text-red-700 border border-red-300'>Data is empty</div>
                      </td>
                    </tr> :
                    tags.map((tag, index) => {
                      return <tr key={tag.id}>
                        <td data-label="#">{index + 1}</td>
                        <td data-label="Name">{tag.name}</td>
                        <td className='actions'>
                          <div className='btn-box'>
                            <button className='btn-edit' onClick={() => router.push(`/data/tag/form/${tag.id}`)}><EditIcon /></button>
                            <button className='btn-delete' onClick={() => showDeleteConfirmation(tag.id)}><DeleteIcon /></button>
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
        <ConfirmDialog open={open} setOpen={setOpen} message={message} callback={() => deleteClientApi({ id, refreshData: () => router.replace(router.asPath), showSuccessToast, showErrorToast })} />
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
    logger.error(error);
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
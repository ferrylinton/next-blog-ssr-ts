import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import Link from 'next/link';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ConfirmDialog from '@/components/ConfirmDialog';
import { useAppContext } from '@/context';
import DataContainer from '@/components/DataContainer';
import ErrorContainer from '@/components/ErrorContainer';
import { getLogger } from '@/utils/logger';
import Breadcrumb from '@/components/Breadcrumb';
import { deleteClientApi } from '@/services/tag-http-client';
import * as tagService from "@/services/tag-service";
import EmptyDataRow from '@/components/EmptyDataRow';

type Props = {
  tags: TagType[],
  error: ErrorInfoType | null;
}

const logger = getLogger('data-tag-index');

const TagPage = ({ tags, error }: Props) => {

  const router = useRouter();

  const { showSuccessToast, showErrorToast } = useAppContext();

  const [showConfirm, setShowConfirm] = useState(false);

  const [id, setId] = useState('');

  const [message, setMessage] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setMessage(`Delete tag with id = ${id}`);
    setId(id);
    setShowConfirm(true);
  }

  if (error)
    return <ErrorContainer code={error.code} message={error.message} items={'Tag'} />
  else
    return (
      <>
        <Breadcrumb items={'Tag'} />
        <DataContainer>
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
                (tags.length === 0) ? <EmptyDataRow colSpan={3} /> :
                  (tags.map((tag, index) => {
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
                  }))
              }
            </tbody>
          </table>
          <div className='w-full flex justify-between items-center px-3 sm:px-0 my-3'>
            <div>Total data : {tags.length}</div>
            <Link href={`${process.env.NEXT_PUBLIC_HOST}/data/tag/form`}
              className="group text-center w-[120px] bg-white hover:bg-slate-100 py-2 leading-none border border-slate-400 rounded">
              <span className='text-slate-500 group-hover:text-slate-700'>Add</span>
            </Link>
          </div>
        </DataContainer>
        <ConfirmDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          message={message}
          callback={() => deleteClientApi({ id, refreshData: () => router.replace(router.asPath), showSuccessToast, showErrorToast })}
        />
      </>
    )

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
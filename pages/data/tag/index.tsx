import { useState } from 'react';
import { GetServerSideProps } from 'next';
import DataContainer from '@/components/DataContainer';
import ErrorContainer from '@/components/ErrorContainer';
import { getLogger } from '@/utils/logger';
import Breadcrumb from '@/components/Breadcrumb';
import * as tagService from "@/services/tag-service";
import EmptyDataRow from '@/components/EmptyDataRow';
import ButtonActions from '@/components/ButtonActions';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import DataToolbar from '@/components/DataToolbar';

type Props = {
  tags: TagType[],
  error: ErrorInfoType | null;
}

const logger = getLogger('data-tag-index');

const TagPage = ({ tags, error }: Props) => {

  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteApiUrl, setDeleteApiUrl] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setDeleteApiUrl(`${process.env.NEXT_PUBLIC_HOST}/api/tags/${id}`)
    setShowConfirm(true);
  }

  if (error)
    return <ErrorContainer code={error.code} message={error.message} items={'Tag'} />
  else
    return (
      <>
        <Breadcrumb label={'Tag'} />
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
                        <ButtonActions
                          editPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/tag/form/${tag.id}`}
                          showDeleteConfirmation={() => showDeleteConfirmation(tag.id)} />
                      </td>
                    </tr>
                  }))
              }
            </tbody>
          </table>
          <DataToolbar totalData={tags.length} formPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/tag/form`} />
        </DataContainer>
        <DeleteConfirmDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={deleteApiUrl} />
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
import Breadcrumb from '@/components/Breadcrumb';
import ButtonActions from '@/components/ButtonActions';
import DataContainer from '@/components/DataContainer';
import DataToolbar from '@/components/DataToolbar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import EmptyDataRow from '@/components/EmptyDataRow';
import ErrorContainer from '@/components/ErrorContainer';
import Searchbox from '@/components/Searchbox';
import * as tagService from "@/services/tag-service";
import { TagType } from '@/types/tag-type';
import { getLogger } from '@/utils/logger';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

type Props = {
  pageable: Pageable<TagType>,
  error: ErrorInfoType | null,
}

const logger = getLogger('data-tag-index');

const TagPage = ({ pageable, error }: Props) => {

  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteApiUrl, setDeleteApiUrl] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setDeleteApiUrl(`${process.env.NEXT_PUBLIC_HOST}/api/tags/${id}`)
    setShowConfirm(true);
  }

  if (error)
    return <ErrorContainer code={error.code} message={error.message} label={'Tag'} />
  else
    return (
      <>
        <Breadcrumb label={'Tag'} />
        <DataContainer>
          <Searchbox keyword={pageable.keyword} />
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
                (pageable.items.length === 0) ? <EmptyDataRow colSpan={3} /> :
                  (pageable.items.map((tag, index) => {
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
          <DataToolbar
            keyword={pageable.keyword}
            page={pageable.page}
            totalPage={pageable.totalPage}
            formPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/tag/form`} />
        </DataContainer>
        <DeleteConfirmDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={deleteApiUrl} />
      </>
    )

}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { keyword, page } = query;
    const pageable = await tagService.find({ keyword, page });

    return {
      props: {
        pageable: JSON.parse(JSON.stringify(pageable))
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
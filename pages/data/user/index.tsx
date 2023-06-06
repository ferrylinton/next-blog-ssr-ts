import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import DataContainer from '@/components/DataContainer';
import * as userService from "@/services/user-service";
import ErrorContainer from '@/components/ErrorContainer';
import Breadcrumb from '@/components/Breadcrumb';
import ButtonActions from '@/components/ButtonActions';
import DataToolbar from '@/components/DataToolbar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { getLogger } from '@/utils/logger';
import { UserType } from '@/types/user-type';
import Searchbox from '@/components/Searchbox';
import EmptyDataRow from '@/components/EmptyDataRow';

type Props = {
  pageable: Pageable<UserType>,
  error: ErrorInfoType | null
}

const logger = getLogger('usermanagement-user-index');

const UserPage = ({ pageable, error }: Props) => {

  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteApiUrl, setDeleteApiUrl] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setDeleteApiUrl(`${process.env.NEXT_PUBLIC_HOST}/api/users/${id}`)
    setShowConfirm(true);
  }

  if (error) {
    return <ErrorContainer code={error.code} message={error.message} label='User' />
  } else {
    return (
      <>
        <Breadcrumb label={'User'} />
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
                (pageable.items.map((user, index) => {
                  return <tr key={user.id}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="Email">{user.email}</td>
                    <td className='actions'>
                      <ButtonActions
                        editPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/user/form/${user.id}`}
                        showDeleteConfirmation={() => showDeleteConfirmation(user.id)} />
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
            formPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/user/form`} />
        </DataContainer>
        <DeleteConfirmDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={deleteApiUrl} />
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { keyword, page } = query;
    const pageable = await userService.find({ keyword, page });

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

export default UserPage
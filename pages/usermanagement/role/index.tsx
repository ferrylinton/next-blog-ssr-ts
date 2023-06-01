import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import DataContainer from '@/components/DataContainer';
import ErrorContainer from '@/components/ErrorContainer';
import Breadcrumb from '@/components/Breadcrumb';
import ButtonActions from '@/components/ButtonActions';
import DataToolbar from '@/components/DataToolbar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import * as roleService from "@/services/role-service";
import { getLogger } from '@/utils/logger';
import EmptyDataRow from '@/components/EmptyDataRow';

type Props = {
  roles: RoleType[],
  error: ErrorInfoType | null
}

const logger = getLogger('usermanagement-role-index');

const RolePage = ({ roles, error }: Props) => {

  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteApiUrl, setDeleteApiUrl] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setDeleteApiUrl(`${process.env.NEXT_PUBLIC_HOST}/api/roles/${id}`)
    setShowConfirm(true);
  }

  if (error) {
    return <ErrorContainer code={error.code} message={error.message} />
  } else {
    return (
      <>
        <Breadcrumb label={'Role'} />
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
                (roles.length === 0) ? <EmptyDataRow colSpan={3} /> :
                (roles.map((role, index) => {
                  return <tr key={role.id}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="Name">{role.name}</td>
                    <td className='actions'>
                      <ButtonActions
                        editPageUrl={`${process.env.NEXT_PUBLIC_HOST}/usermanagement/role/form/${role.id}`}
                        showDeleteConfirmation={() => showDeleteConfirmation(role.id)} />
                    </td>
                  </tr>
                }))
              }
            </tbody>
          </table>
          <DataToolbar totalData={roles.length} formPageUrl={`${process.env.NEXT_PUBLIC_HOST}/usermanagement/role/form`} />
        </DataContainer>
        <DeleteConfirmDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={deleteApiUrl} />
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const roles = await roleService.findAllJson();
    return {
      props: {
        roles
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

export default RolePage
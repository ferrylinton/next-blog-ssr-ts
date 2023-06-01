import { useState } from 'react';
import { GetServerSideProps } from 'next';
import DataContainer from '@/components/DataContainer';
import ErrorContainer from '@/components/ErrorContainer';
import { getLogger } from '@/utils/logger';
import Breadcrumb from '@/components/Breadcrumb';
import * as authorityService from "@/services/authority-service";
import EmptyDataRow from '@/components/EmptyDataRow';
import DataToolbar from '@/components/DataToolbar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ButtonActions from '@/components/ButtonActions';


type Props = {
  authorities: AuthorityType[],
  error: ErrorInfoType | null
}

const logger = getLogger('usermanagement-authority-index');

const AuthorityPage = ({ authorities, error }: Props) => {

  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteApiUrl, setDeleteApiUrl] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setDeleteApiUrl(`${process.env.NEXT_PUBLIC_HOST}/api/authorities/${id}`)
    setShowConfirm(true);
  }


  if (error)
    return <ErrorContainer code={error.code} message={error.message} />
  else
    return (
      <>
        <Breadcrumb label={'Authority'} />
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
                (authorities.length === 0) ? <EmptyDataRow colSpan={3} /> :
                  (authorities.map((authority, index) => {
                    return <tr key={authority.id}>
                      <td data-label="#">{index + 1}</td>
                      <td data-label="Name">{authority.name}</td>
                      <td className='actions'>
                        <ButtonActions
                          editPageUrl={`${process.env.NEXT_PUBLIC_HOST}/usermanagement/authority/form/${authority.id}`}
                          showDeleteConfirmation={() => showDeleteConfirmation(authority.id)} />
                      </td>
                    </tr>
                  }))
              }
            </tbody>
          </table>
          <DataToolbar totalData={authorities.length} formPageUrl={`${process.env.NEXT_PUBLIC_HOST}/usermanagement/authority/form`} />
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
    const authorities = await authorityService.findAllJson();
    return {
      props: {
        authorities
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

export default AuthorityPage
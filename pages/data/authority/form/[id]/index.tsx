import React from 'react';
import AuthorityForm from '@/components/forms/AuthorityForm';
import { GetServerSideProps } from 'next';
import * as authorityService from "@/services/authority-service";
import ErrorContainer from '@/components/ErrorContainer';
import { AuthorityFormType } from '@/types/authority-type';

type Props = {
  error: ErrorInfoType | null;
} & AuthorityFormType

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: 'Authority',
    link: `${process.env.NEXT_PUBLIC_HOST}/data/authority`
  },
  {
    label: 'Form'
  }
]


const AuthorityFormPage = ({ id, name, error }: Props) => {

  if (error)
    return <ErrorContainer code={error.code} message={error.message} items={breadcrumbItems} />
  else
    return <AuthorityForm id={id} name={name} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const authority = await authorityService.findById(id);
  return {
    props: {
      id,
      name: authority ? authority.name : ''
    }
  }
}

export default AuthorityFormPage
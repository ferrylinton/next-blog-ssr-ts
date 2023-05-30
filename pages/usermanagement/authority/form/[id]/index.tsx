import React from 'react';
import AuthorityForm from '@/components/forms/AuthorityForm';
import { GetServerSideProps } from 'next';
import * as authorityService from "@/services/authority-service";

type Props = {
  id: string,
  name: string
}

const AuthorityFormPage = ({id, name} : Props) => {

  return (
    <AuthorityForm id={id} name={name} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const { name } = await authorityService.findById(id);
  return {
      props: {
          id,
          name
      }
  }
}

export default AuthorityFormPage
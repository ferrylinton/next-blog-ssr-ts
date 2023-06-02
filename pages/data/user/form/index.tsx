import React from 'react';
import CreateUserForm from '@/components/forms/CreateUserForm';
import { GetServerSideProps } from 'next';
import * as roleService from "@/services/role-service";

type Props = {
  allRoles: string[]
}

const TagFormPage = ({allRoles} : Props) => {

  return (
    <CreateUserForm
      email=''
      password=''
      passwordConfirm=''
      role=''
      allRoles={allRoles} />

  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const allRoles = await roleService.findAllNamesJson();

  return {
    props: {
      allRoles
    }
  }
}


export default TagFormPage
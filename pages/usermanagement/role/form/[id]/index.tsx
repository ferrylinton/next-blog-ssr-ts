import React from 'react';
import RoleForm from '@/components/forms/RoleForm';
import { GetServerSideProps } from 'next';
import * as authorityService from "@/services/authority-service";
import * as roleService from "@/services/role-service";

type Props = {
  id: string,
  name: string,
  authorities: AuthorityType[]
}

const RoleFormPage = ({id, name, authorities} : Props) => {

  return (
    <RoleForm id={id} name={name} authorities={authorities} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const role = await roleService.findOneById(id);
  const authoritiesObject = await authorityService.find();
  const authorities  = authoritiesObject.map(obj => obj.toJSON());
  
  return {
      props: {
          id,
          name : role ?? '',
          authorities
      }
  }
}

export default RoleFormPage
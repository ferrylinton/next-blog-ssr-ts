import React from 'react';
import RoleForm from '@/components/forms/RoleForm';
import { GetServerSideProps } from 'next';
import * as authorityService from "@/services/authority-service";
import * as roleService from "@/services/role-service";

type Props = {
  authorityNames: string[]
} & CreateRoleType

const RoleFormPage = ({id, name, authorities, authorityNames} : Props) => {

  return (
    <RoleForm id={id} name={name} authorities={authorities} authorityNames={authorityNames} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const role = await roleService.findByIdJson(id);
  const name = role ? role.name : '';
  const authorities = role ? role.authorities.map((authority: { name: any; }) => authority.name) : [];
  const authorityNames = await authorityService.findAllNamesJson();
  
  return {
      props: {
          id,
          name,
          authorities,
          authorityNames
      }
  }
}

export default RoleFormPage
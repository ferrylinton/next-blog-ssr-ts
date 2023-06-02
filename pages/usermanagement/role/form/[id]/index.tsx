import React from 'react';
import RoleForm from '@/components/forms/RoleForm';
import { GetServerSideProps } from 'next';
import * as authorityService from "@/services/authority-service";
import * as roleService from "@/services/role-service";

type Props = {
  allAuthorities: string[]
} & CreateRoleType

const RoleFormPage = ({id, name, authorities, allAuthorities} : Props) => {

  return (
    <RoleForm id={id} name={name} authorities={authorities} allAuthorities={allAuthorities} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const role = await roleService.findByIdJson(id);
  const name = role ? role.name : '';
  const authorities = role ? role.authorities.map((authority: { name: any; }) => authority.name) : [];
  const allAuthorities = await authorityService.findAllNamesJson();
  
  return {
      props: {
          id,
          name,
          authorities,
          allAuthorities
      }
  }
}

export default RoleFormPage
import React from 'react';
import RoleForm from '@/components/forms/RoleForm';
import { GetServerSideProps } from 'next';
import * as authorityService from "@/services/authority-service";


type Props = {
  allAuthorities: string[]
}

const RoleFormPage = ({ allAuthorities }: Props) => {

  return (
    <RoleForm name='' authorities={[]} allAuthorities={allAuthorities} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const allAuthorities = await authorityService.findAllNamesJson();
    return {
      props: { allAuthorities }
    };
  } catch {
    return {
      props: {
        allAuthorities: []
      }
    };
  }
};

export default RoleFormPage
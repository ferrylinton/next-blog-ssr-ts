import React from 'react';
import RoleForm from '@/components/forms/RoleForm';
import { GetServerSideProps } from 'next';
import * as authorityService from "@/services/authority-service";


type Props = {
  authorityNames: string[]
}

const RoleFormPage = ({ authorityNames }: Props) => {

  return (
    <RoleForm name={''} authorities={[]} authorityNames={authorityNames} />

  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const authorityNames = await authorityService.findAllNamesJson();
    return {
      props: { authorityNames }
    };
  } catch {
    return {
      props: {
        authorityNames: []
      }
    };
  }
};

export default RoleFormPage
import React from 'react';
import RoleForm from '@/components/forms/RoleForm';
import { GetServerSideProps } from 'next';


type Props = {
  authorities: AuthorityType[]
}

const RoleFormPage = ({authorities} : Props) => {

  return (
    <RoleForm name={''} authorities={authorities} />

  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    let authorities: AuthorityType[] = [];

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/authorities`);

    if (response.status === 200) {
      authorities = await response.json();
    } 

    return {
      props: { authorities }
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {
        authorities: []
      }
    };
  }
};

export default RoleFormPage
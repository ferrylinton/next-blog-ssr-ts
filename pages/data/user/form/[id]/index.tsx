import React from 'react';
import { GetServerSideProps } from 'next';
import * as roleService from "@/services/role-service";
import * as userService from "@/services/user-service";
import UpdateUserForm from '@/components/forms/UpdateUserForm';

type Props = {
  allRoles: string[]
} & UpdateUserType

const UpdateUserFormPage = ({id, email, role, allRoles} : Props) => {

  return (
    <UpdateUserForm
      id={id}
      email={email}
      role={role}
      allRoles={allRoles} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const user = await userService.findByIdJson(id);
  console.log(user);
  const email = user ? user.email : '';
  const role = user ? user.role.name : '';
  const allRoles = await roleService.findAllNamesJson();

  return {
    props: {
      id,
      user,
      email,
      role,
      allRoles
    }
  }
}

export default UpdateUserFormPage
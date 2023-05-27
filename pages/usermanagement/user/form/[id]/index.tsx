import React from 'react';
import TagForm from '@/components/forms/TagForm';
import { GetServerSideProps } from 'next';
import * as tagService from "@/services/tag-service";

type Props = {
  id: string,
  name: string
}

const TagFormPage = ({id, name} : Props) => {

  return (
    <TagForm id={id} name={name} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const { name } = await tagService.findOneById(id);
  return {
      props: {
          id,
          name
      }
  }
}

export default TagFormPage
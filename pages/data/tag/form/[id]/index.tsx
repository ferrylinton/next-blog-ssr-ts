import React from 'react';
import TagForm from '@/components/forms/TagForm';
import { GetServerSideProps } from 'next';
import * as tagService from "@/services/tag-service";
import { getLogger } from '@/utils/logger';

type Props = {
  error: ErrorResponseType | null;
} & TagFromType

const logger = getLogger('tag-form-index');

const TagFormPage = ({ id, name, error }: Props) => {
  return (
    <TagForm id={id} name={name} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id as string;
    const { name } = await tagService.findById(id);
    return {
      props: {
        id,
        name
      }
    }
  } catch (error: any) {
    logger.error(error);
    return {
      props: {
        error: {
          code: 500,
          message: error.message
        }
      }
    };
  }


}

export default TagFormPage
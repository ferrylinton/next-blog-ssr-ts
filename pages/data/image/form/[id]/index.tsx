import React from 'react';
import ImageForm from '@/components/forms/ImageForm';
import { GetServerSideProps } from 'next';
import * as imageService from "@/services/image-service";
import ErrorContainer from '@/components/ErrorContainer';
import { ImageFormType } from '@/types/image-type';

type Props = {
  error: ErrorInfoType | null;
} & ImageFormType

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: 'Image',
    link: `${process.env.NEXT_PUBLIC_HOST}/data/image`
  },
  {
    label: 'Form'
  }
]


const ImageFormPage = ({ id, slug, error }: Props) => {

  if (error)
    return <ErrorContainer code={error.code} message={error.message} items={breadcrumbItems} />
  else
    return <ImageForm id={id} slug={slug} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const image = await imageService.findById(id);
  return {
    props: {
      id,
      slug: image ? image.slug : ''
    }
  }
}

export default ImageFormPage
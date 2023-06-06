import ErrorContainer from '@/components/ErrorContainer';
import TagForm from '@/components/forms/TagForm';
import * as tagService from "@/services/tag-service";
import { TagFormType } from '@/types/tag-type';
import { getLogger } from '@/utils/logger';
import { GetServerSideProps } from 'next';

type Props = {
  error: ErrorInfoType | null;
} & TagFormType;

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: 'Tag',
    link: `${process.env.NEXT_PUBLIC_HOST}/data/tag`
  },
  {
    label: 'Form'
  }
]

const logger = getLogger('tag-form-index');

const TagFormPage = ({ id, name, error }: Props) => {
  if (error)
    return <ErrorContainer code={error.code} message={error.message} items={breadcrumbItems} />
  else
    return <TagForm id={id} name={name} />
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
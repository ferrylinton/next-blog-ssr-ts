import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import DataContainer from '@/components/DataContainer';
import { getLogger } from '@/utils/logger';
import ErrorContainer from '@/components/ErrorContainer';
import Breadcrumb from '@/components/Breadcrumb';
import ButtonActions from '@/components/ButtonActions';
import DataToolbar from '@/components/DataToolbar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import * as postService from "@/services/post-service";
import EmptyDataRow from '@/components/EmptyDataRow';

type Props = {
  posts: PostType[],
  error: ErrorInfoType | null
}

const logger = getLogger('data-post-index');

const PostPage = ({ posts, error }: Props) => {

  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteApiUrl, setDeleteApiUrl] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setDeleteApiUrl(`${process.env.NEXT_PUBLIC_HOST}/api/posts/${id}`)
    setShowConfirm(true);
  }

  if (error) {
    return <ErrorContainer code={error.code} message={error.message} label='Post' />
  } else {
    return (
      <>
        <Breadcrumb label={'Post'} />
        <DataContainer>

          <table className='table-responsive w-full'>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th className='actions'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                (posts.length === 0) ? <EmptyDataRow colSpan={3} /> :
                (posts.map((post, index) => {
                  return <tr key={post.id}>
                    <td data-label="#">{index + 1}</td>
                    <td data-label="Title">{post.title}</td>
                    <td className='actions'>
                      <ButtonActions
                        editPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/post/form/${post.id}`}
                        showDeleteConfirmation={() => showDeleteConfirmation(post.id)} />
                    </td>
                  </tr>
                }))
              }
            </tbody>
          </table>

          <DataToolbar totalData={posts.length} formPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/post/form`} />
        </DataContainer>
        <DeleteConfirmDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={deleteApiUrl} />
      </>
    )
  }
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const posts = await postService.findAllJson();
    return {
      props: {
        posts
      }
    };
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
};

export default PostPage
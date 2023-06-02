import PostForm from '@/components/forms/PostForm';
import { GetServerSideProps } from 'next';
import React from 'react';
import * as tagService from "@/services/tag-service";

type Props = {
  allTags: string[]
}

const PostPageForm = ({ allTags }: Props) => {
  return (
    <PostForm
      slug=''
      title=''
      description=''
      content=''
      tags={[]}
      allTags={allTags} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    const allTags = await tagService.findAllNamesJson();
    return {
      props: { allTags }
    };
  } catch {
    return {
      props: {
        allAuthorities: []
      }
    };
  }
};

export default PostPageForm
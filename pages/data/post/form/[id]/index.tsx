import React from 'react';
import PostForm from '@/components/forms/PostForm';
import { GetServerSideProps } from 'next';
import * as tagService from "@/services/tag-service";
import * as postService from "@/services/post-service";

type Props = {
  allTags: string[]
} & PostFormType

const PostFormPage = ({ id, slug, title, description, content, tags, allTags }: Props) => {

  return (
    <PostForm
      id={id}
      slug={slug}
      title={title}
      description={description}
      content={content}
      tags={tags}
      allTags={allTags} />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;
  const post = await postService.findByIdJson(id);
  const slug = post ? post.slug : '';
  const title = post ? post.title : '';
  const description = post ? post.description : '';
  const content = post ? post.content : '';
  const tags = post ? post.tags.map((tag: { name: any; }) => tag.name) : [];
  const allTags = await tagService.findAllNamesJson();

  return {
    props: {
      id,
      slug,
      title,
      description,
      content,
      tags,
      allTags
    }
  }
}

export default PostFormPage
import React from 'react'
import * as postService from "@/services/post-service";
import { GetServerSideProps } from 'next';
import { PostType } from '@/types/post-type';
import { render } from '@/utils/markdown';

type Props = {
    post: PostType
}

const ReadPostPage = ({ post }: Props) => {
    return (
        <div className="w-full h-full mt-[50px] sm:mt-[60px] lg:mt-0 flex mx-auto flex-wrap">
            <article className="w-full bg-white flex flex-col sm:shadow m-0 sm:m-4 rounded">
                <div className="w-full flex flex-col justify-start p-6">
                    <div className="w-full prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: post?.content }} />
                </div>
            </article>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const slug = params?.slug as string;
    const post = await postService.findBySlugJson(slug);

    if (post) {
        post.content = render(post.content);
    } else {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post
        }
    }
}

export default ReadPostPage
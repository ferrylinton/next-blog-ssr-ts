import React from 'react'
import PostItem from './PostItem';
import { PostType } from '@/types/post-type';

type Props = {
    pageable: Pageable<PostType>
}

function PostList({ pageable }: Props) {

    if (pageable.items.length > 0)
        return (
            <div className="w-full flex justify-start items-start flex-wrap gap-2 px-3">
                {
                    pageable.items.map((post) => {
                        return <PostItem key={post.id} post={post} />
                    })

                }
            </div>
        )
    else
        return (
            <div className=''>
                <div>Data is empty</div>
            </div>
        )

}

export default PostList
import React from 'react'
import PostItem from './PostItem';
import { PostType } from '@/types/post-type';

type Props = {
    pageable: Pageable<PostType>
}

function PostList({ pageable }: Props) {


    return (
        <div className="w-full flex justify-start items-start flex-wrap gap-2 px-3">
            {
                (pageable.items.length === 0) ? <div>Data is empty</div> :
                    (pageable.items.map((post) => {
                        return <PostItem key={post.id} post={post} />
                    }))
            }

        </div>
    )
}

export default PostList
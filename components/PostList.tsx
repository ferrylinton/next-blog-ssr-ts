import React from 'react'
import PostItem from './PostItem';

type Props = {}

function PostList({ }: Props) {

    const postItems = [];
    for (let i = 0; i < 10; i++) {
        postItems.push(<PostItem key={i}/>);
    }

    return (
        <div className="flex flex-wrap gap-2 justify-evenly items-center px-3">{postItems}</div>
    )
}

export default PostList
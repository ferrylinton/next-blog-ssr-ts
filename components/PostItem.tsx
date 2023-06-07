import { PostType } from '@/types/post-type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    post: PostType
}

function PostItem({ post }: Props) {
    return (
        <article className="w-full md:w-[calc(50%-10px)] shadow mb-4 bg-white flex flex-col justify-start p-2 rounded">
            <Link href="#" className="hover:opacity-75">
                <Image
                    src="https://source.unsplash.com/collection/1346951/500x250?sig=1"
                    alt="Picture of the author"
                    width="0"
                    height="0"
                    sizes="100vw"
                    priority={true}
                    className="w-full h-auto" />
            </Link>
            <div className='flex flex-col p-2'>
                <div className='grow flex flex-col'>
                    <Link href="#" className="text-green-800 text-xs font-bold uppercase py-4">Technology</Link>
                    <Link href={`/post/${post.slug}`} className="text-lg font-bold hover:text-gray-700 pb-4">{post.title}</Link>
                    <div className="text-sm pb-3">{post.updatedAt}</div>
                    <div className="pb-6">{post.description}</div>
                </div>
                <Link href={`/post/${post.slug}`} className="flex-none uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></Link>
            </div>
        </article>
    )
}

export default PostItem
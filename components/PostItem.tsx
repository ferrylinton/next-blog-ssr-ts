import { PostType } from '@/types/post-type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { format, compareAsc } from 'date-fns'

type Props = {
    post: PostType
}

function PostItem({ post }: Props) {

    const getDate = ({createdAt, updatedAt}: PostType) => {
        if(updatedAt > createdAt){
            return  format(new Date(updatedAt), 'MM/dd/yyyy');
        }else{
            return  format(new Date(createdAt), 'MM/dd/yyyy');
        }
    } 

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
                    <div className='flex text-xs uppercase'>
                        {
                            post.tags.map((tag: any) => {
                                return <Link key={tag} href={`/tag/${tag.name}`} className="text-slate-600 hover:text-slate-800 hover:font-bold pe-2">{tag.name}</Link>
                            })
                        }
                    </div>
                    <Link href={`/post/${post.slug}`} className="text-lg font-bold hover:text-gray-700 py-4">{post.title}</Link>
                    <div className="text-sm pb-3">{getDate(post)}</div>
                    <div className="pb-6">{post.description}</div>
                </div>
                <Link href={`/post/${post.slug}`} className="flex-none uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></Link>
            </div>
        </article>
    )
}

export default PostItem
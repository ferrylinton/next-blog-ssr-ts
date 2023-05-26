import Image from 'next/image'
import React from 'react'

type Props = {

}

function PostItem({ }: Props) {
    return (
        <article className="w-full md:w-[46%] shadow mb-4">

            <div className="bg-white flex flex-col justify-start p-2 rounded">
                <a href="#" className="hover:opacity-75">
                    <Image
                        src="https://source.unsplash.com/collection/1346951/500x250?sig=1"
                        alt="Picture of the author"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority={true}
                        className="w-full h-auto" />
                </a>
                <div className='flex flex-col  p-2'>
                    <a href="#" className="text-green-800 text-xs font-bold uppercase py-4">Technology</a>
                    <a href="#" className="text-lg font-bold hover:text-gray-700 pb-4">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</a>
                    <p className="text-sm pb-3">
                        By <a href="#" className="font-semibold hover:text-gray-800">David Grzyb</a>, Published on April 25th, 2020
                    </p>
                    <a href="#" className="pb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis dui porta volutpat. In sit amet posuere magna..</a>
                    <a href="/post/test" className="uppercase text-gray-800 hover:text-black">Continue Reading <i className="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </article>
    )
}

export default PostItem
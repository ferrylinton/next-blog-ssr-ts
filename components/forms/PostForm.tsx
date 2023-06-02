import React from 'react';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from '@/validations/post-schema';
import { useAppContext } from '@/context';
import FormContainer from './FormContainer';
import { postClientApi, putClientApi } from '@/services/http-client';
import Breadcrumb from '../Breadcrumb';
import FormButtons from './FormButtons';


const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: 'Post',
        link: `${process.env.NEXT_PUBLIC_HOST}/data/post`
    },
    {
        label: 'Form'
    }
]

const PostForm = ({ id, slug, title, description, content, tags, allTags }: PostFormType) => {

    const router = useRouter();

    const context = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostFormType>({
        resolver: zodResolver(CreatePostSchema),
        defaultValues: { slug, title, description, content, tags }
    });

    const refreshData = () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/post`);

    const onSubmit: SubmitHandler<PostFormType> = async (data) => {
        if (id) {
            putClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/posts/${id}`,
                data: JSON.stringify(data),
                refreshData,
                context
            })
        } else {
            postClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/posts`,
                data: JSON.stringify(data),
                refreshData,
                context
            })
        }
    };

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <FormContainer>
                <div className='flex justify-center items-center w-full max-w-md sm:bg-slate-50 sm:border border-slate-300 rounded-lg mx-4 my-8 sm:mx-0 px-5 py-14 '>
                    <form
                        className='flex-1'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete='off' >
                        <div className="mb-8 uppercase">
                            <label className="block mb-2 text-sm" htmlFor="name">Slug</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.slug ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                type="text"
                                placeholder="Slug"
                                maxLength={50}
                                {...register("slug")}
                            />
                            {errors.slug && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.slug?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-8 uppercase">
                            <label className="block mb-2 text-sm" htmlFor="name">Title</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.title ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                type="text"
                                placeholder="Title"
                                maxLength={50}
                                {...register("title")}
                            />
                            {errors.title && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.title?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-8 uppercase">
                            <label className="block mb-2 text-sm" htmlFor="name">Description</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.description ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                type="text"
                                placeholder="Description"
                                maxLength={50}
                                {...register("description")}
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.description?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-8 uppercase">
                            <label className="block mb-2 text-sm" htmlFor="name">Content</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.content ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                type="text"
                                placeholder="Content"
                                maxLength={50}
                                {...register("content")}
                            />
                            {errors.content && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.content?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-8 uppercase">
                            <div className={`flex justify-start flex-wrap border rounded p-2 bg-white ${errors.tags ? 'border-red-500' : 'border-slate-400'}`}>
                                {
                                    allTags?.map((tag, _index) => {
                                        return <div className="min-w-[190px] mb-[1rem] min-h-[1.5rem] pl-[1.5rem] flex justify-start items-center" key={tag}>
                                            <input
                                                type="checkbox" {...register("tags")} value={tag}
                                                className="relative float-left -ml-[1.5rem] mr-[3px] mt-[0.15rem] h-[1.5rem] w-[1.5rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 "
                                            />
                                            <label className="inline-block pl-[0.15rem] hover:cursor-pointer me-5 text-sm">
                                                {tag}
                                            </label>
                                        </div>
                                    })
                                }
                            </div>
                            {errors.tags && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.tags?.message}
                                </p>
                            )}
                        </div>
                        <FormButtons onCancelHandler={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/post`)} />
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default PostForm
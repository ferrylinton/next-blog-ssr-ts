import React from 'react';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTagType, CreateTagSchema } from '@/validations/tag-schema';
import { useAppContext } from '@/context';
import Link from 'next/link';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import HomeIcon from '@/icons/HomeIcon';


type Props = {
    id?: string
} & CreateTagType


const TagForm = ({ id, name }: Props) => {

    const router = useRouter();

    let { showSuccessToast, showErrorToast } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TagType>({
        resolver: zodResolver(CreateTagSchema),
        defaultValues: { name }
    });

    const onSubmit: SubmitHandler<TagType> = async (data) => {
        console.log(data);

        const url = id ? `/api/tags/${id}` : '/api/tags';
        const method = id ? 'PUT' : 'POST';

        const res = await fetch(url, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            method,
        });


        if (res.status === 200) {
            showSuccessToast('Data is saved');
            router.push("/tag");
        } else {
            const result = await res.json();
            showErrorToast(result.message);
        }
    };

    return (
        <div className='w-full max-w-4xl h-full flex flex-col'>
            <div className='breadcrumb flex-none flex justify-center items-center gap-3 uppercase py-2'>
                <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
                <ArrowRightIcon className='w-3 h-3' />
                <Link href="/tag">Tag</Link>
                <ArrowRightIcon className='w-3 h-3' />
                <span>Form</span>
            </div>
            <div className='grow flex justify-center items-center w-full'>
                <div className='flex justify-center items-center w-full max-w-md bg-white border border-slate-400 rounded-lg mx-4 my-8 sm:mx-0 px-5 py-14 '>
                    <form
                        className='flex-1'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete='off' >
                        <div className="mb-8 uppercase">
                            <label className="block mb-2 text-sm" htmlFor="name">Name</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.name ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                id="name"
                                type="text"
                                placeholder="NAME"
                                maxLength={50}
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <div className="mt-5 text-center flex gap-1">
                            <button onClick={() => router.back()} className='w-full py-2 btn btn-default' type="button">Cancel</button>
                            <button className="w-full py-2 btn btn-primary" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TagForm
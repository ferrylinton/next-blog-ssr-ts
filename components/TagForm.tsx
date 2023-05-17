import React from 'react';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTagType, CreateTagSchema } from '@/validations/tag-schema';
import { Righteous } from 'next/font/google'

const righteous = Righteous({
    subsets: ['latin'],
    weight: '400'
})

type Props = {
    id?: string
} & CreateTagType


const TagForm = ({ id, name }: Props) => {

    const router = useRouter();

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

        const res = await fetch('/api/tags', {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });

        const result = await res.json();
        if (res.status === 200) {
            router.push("/tag")
        }else{
            alert('error');
        }
    };

    return (
        <div className='flex justify-center'>
            <div className='flex justify-center w-full max-w-3xl'>
                <div className='w-full m-3'>
                    <div className={`mb-9 text-center uppercase text-2xl ` + righteous.className}>Tag - Form</div>
                    <form
                        className='w-[300px] flex flex-col justify-center '
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete='off' >

                        <div className="mb-4 uppercase text-gray-700">
                            <label className="block mb-2 text-sm font-bold" htmlFor="name">
                                Name
                            </label>
                            <input
                                className={`w-full p-4 text-sm leading-tight border ${errors.name && "border-red-500"} rounded appearance-none focus:outline-none focus:shadow-outline`}
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
                        <div className="my-5 text-center">
                            <button
                                className="h-12 w-full text-gray-200 hover:text-white border border-blue-600  rounded cursor-pointer transition duration-500 bg-gradient-to-tl from-blue-800 via-blue-600 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
                                type="submit">
                                <span className={`uppercase font-bold tracking-widest drop-shadow ${righteous.className}`}>Save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TagForm
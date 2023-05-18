import React from 'react';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTagType, CreateTagSchema } from '@/validations/tag-schema';
import { useAppContext } from '@/context';


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
        <div className='flex flex-col justify-center items-center px-4 sm:px-0'>
            <div className={`mt-3 mb-9 text-center uppercase text-2xl font-righteous`}>Tag - Form</div>
            <div className='w-full max-w-md sm:border sm:border-gray-200 rounded px-0 py-8 sm:px-5 sm:py-8'>
                <form

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
                    <div className="mt-5 text-center flex gap-1">
                        <button
                            onClick={() => router.back()}
                            className="h-10 w-full text-center text-gray-600 hover:text-gray-600 border border-gray-300  rounded cursor-pointer transition duration-500 bg-gradient-to-tl from-gray-100 via-gray-50 to-white bg-size-200 bg-pos-0 hover:bg-pos-100 uppercase font-bold tracking-wide font-righteous"
                            type="button">
                            <span className='uppercase font-bold tracking-widest drop-shadow font-righteous'>BACK</span>
                        </button>
                        <button
                            className="h-10 w-full text-gray-200 hover:text-white border border-blue-600  rounded cursor-pointer transition duration-500 bg-gradient-to-tl from-blue-800 via-blue-600 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100"
                            type="submit">
                            <span className='uppercase font-bold tracking-widest drop-shadow font-righteous'>Save</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TagForm
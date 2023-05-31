import React from 'react';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTagSchema } from '@/validations/tag-schema';
import { useAppContext } from '@/context';
import FormContainer from '@/components/forms/FormContainer';
import { createOrUpdateClientApi } from '@/services/tag-http-client';
import Breadcrumb from '@/components/Breadcrumb';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: 'Tag',
        link: `${process.env.NEXT_PUBLIC_HOST}/data/tag`
    },
    {
        label: 'Form'
    }
]

const TagForm = ({ id, name = '' }: TagFromType) => {

    const router = useRouter();

    const { showSuccessToast, showErrorToast } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TagFromType>({
        resolver: zodResolver(CreateTagSchema),
        defaultValues: { name }
    });

    const onSubmit: SubmitHandler<TagFromType> = async (data) => {
        createOrUpdateClientApi({ id, data, refreshData: () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/tag`), showSuccessToast, showErrorToast });
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
                            <button
                                onClick={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/tag`)}
                                type='button'
                                className="group w-full bg-white hover:bg-slate-100 py-2 px-4 border border-slate-400 rounded">
                                <span className='font-semibold text-slate-500 group-hover:text-slate-700'>Cancel</span>
                            </button>

                            <button
                                type="submit"
                                className="group w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 border border-blue-800 rounded">
                                <span className='font-semibold text-slate-200 group-hover:text-white'>Save</span>
                            </button>
                        </div>
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default TagForm
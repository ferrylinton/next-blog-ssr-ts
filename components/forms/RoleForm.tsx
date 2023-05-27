import React from 'react';
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateRoleType, CreateRoleSchema } from '@/validations/role-schema';
import { useAppContext } from '@/context';
import Link from 'next/link';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import HomeIcon from '@/icons/HomeIcon';
import FormContainer from './FormContainer';


type Props = {
    id?: string
} & CreateRoleType


const RoleForm = ({ id, name }: Props) => {

    const router = useRouter();

    let { showSuccessToast, showErrorToast } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RoleType>({
        resolver: zodResolver(CreateRoleSchema),
        defaultValues: { name }
    });

    const onSubmit: SubmitHandler<RoleType> = async (data) => {
        console.log(data);

        const url = id ? `${process.env.HOST}/api/roles/${id}` : `${process.env.HOST}/api/roles`;
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
            router.push("/role");
        } else {
            const result = await res.json();
            showErrorToast(result.message);
        }
    };

    return (
        <>
            <div className='flex-none flex justify-start items-center text-sm gap-2 ps-7 py-4 uppercase mt-[50px] lg:mt-0'>
                <Link className='flex justify-start items-center gap-2' href="/"><HomeIcon className='w-4 h-4' /><span>Home</span></Link>
                <ArrowRightIcon className='w-3 h-3' />
                <Link href="/role">Role</Link>
                <ArrowRightIcon className='w-3 h-3' />
                <span>Form</span>
            </div>
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
                                onClick={() => router.back()}
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

export default RoleForm
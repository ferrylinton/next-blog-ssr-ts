import Breadcrumb from '@/components/Breadcrumb';
import FormContainer from '@/components/forms/FormContainer';
import { useAppContext } from '@/context';
import { postClientApi, putClientApi } from '@/services/http-client';
import { TagFormType } from '@/types/tag-type';
import { CreateTagSchema } from '@/validations/tag-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import FormButtons from './FormButtons';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: 'Tag',
        link: `${process.env.NEXT_PUBLIC_HOST}/data/tag`
    },
    {
        label: 'Form'
    }
]

const TagForm = ({ id, name = '', logo = '' }: TagFormType) => {

    const router = useRouter();

    const context = useAppContext();

    const [currentLogo, setCurrentLogo] = useState(logo)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TagFormType>({
        resolver: zodResolver(CreateTagSchema),
        defaultValues: { name, logo }
    });

    const refreshData = () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/tag`);

    const onLogoChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentLogo(e.target.value);
    };

    const onSubmit: SubmitHandler<TagFormType> = async (data) => {
        if (id) {
            putClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/tags/${id}`,
                data: JSON.stringify(data),
                refreshData,
                context
            })
        } else {
            postClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/tags`,
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
                <div className='flex justify-center items-center w-full max-w-md my-8 px-3 ms:px-0'>
                    <form
                        className='flex-1'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete='off' >
                        <div className="mb-5">
                            <span className="block mb-2 text-sm">Name</span>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.name ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                type="text"
                                placeholder="Name"
                                maxLength={50}
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="uppercase text-xs text-red-500 mt-2">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-5">
                            <span className="block mb-1 text-sm ps-1">Logo</span>
                            <textarea
                                className={`w-full p-3 text-sm leading-tight border ${errors.logo ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                rows={10}
                                placeholder="Logo"
                                {...register("logo", { onChange: onLogoChange })}
                            />
                            {errors.logo && (
                                <p className="uppercase text-xs text-red-500 mt-1 ps-1">
                                    {errors.logo?.message}
                                </p>
                            )}
                            {
                                currentLogo && <div className='w-full border border-slate-400 my-1 rounded bg-slate-100 p-2 min-h-[100px]' dangerouslySetInnerHTML={{ __html: currentLogo }} ></div>
                            }
                        </div>
                        <FormButtons onCancelHandler={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/tag`)} />
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default TagForm
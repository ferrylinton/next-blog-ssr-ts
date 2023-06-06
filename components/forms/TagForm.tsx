import Breadcrumb from '@/components/Breadcrumb';
import FormContainer from '@/components/forms/FormContainer';
import { useAppContext } from '@/context';
import { postClientApi, putClientApi } from '@/services/http-client';
import { TagFormType } from '@/types/tag-type';
import { valueToUppercase } from '@/utils/form';
import { CreateTagSchema } from '@/validations/tag-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
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

const TagForm = ({ id, name = '' }: TagFormType) => {

    const router = useRouter();

    const context = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TagFormType>({
        resolver: zodResolver(CreateTagSchema),
        defaultValues: { name }
    });

    const refreshData = () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/tag`);

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
                <div className='flex justify-center items-center w-full max-w-md sm:bg-slate-200 sm:border border-slate-400 rounded-lg mx-4 my-8 sm:mx-0 px-5 py-14 '>
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
                                {...register("name", { onChange: valueToUppercase })}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.name?.message}
                                </p>
                            )}
                        </div>
                        <FormButtons onCancelHandler={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/tag`)} />
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default TagForm
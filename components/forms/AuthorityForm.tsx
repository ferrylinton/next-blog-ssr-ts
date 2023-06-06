import { useAppContext } from '@/context';
import { postClientApi, putClientApi } from '@/services/http-client';
import { valueToUppercase } from '@/utils/form';
import { CreateAuthoritySchema } from '@/validations/authority-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Breadcrumb from '../Breadcrumb';
import FormButtons from './FormButtons';
import FormContainer from './FormContainer';

const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: 'Authority',
        link: `${process.env.NEXT_PUBLIC_HOST}/data/authority`
    },
    {
        label: 'Form'
    }
]

const AuthorityForm = ({ id, name }: AuthorityFormType) => {

    const router = useRouter();

    const context = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthorityFormType>({
        resolver: zodResolver(CreateAuthoritySchema),
        defaultValues: { name }
    });

    const refreshData = () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/authority`);

    const onSubmit: SubmitHandler<AuthorityFormType> = async (data) => {
        if (id) {
            putClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/authorities/${id}`,
                data: JSON.stringify(data),
                refreshData,
                context
            })
        } else {
            postClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/authorities`,
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
                        <FormButtons onCancelHandler={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/authority`)} />
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default AuthorityForm
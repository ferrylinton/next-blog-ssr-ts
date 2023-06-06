import { useAppContext } from '@/context';
import { putClientApi } from '@/services/http-client';
import { UpdateUserType } from '@/types/user-type';
import { valueToLowercase } from '@/utils/form';
import { UpdateUserSchema } from '@/validations/user-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Breadcrumb from '../Breadcrumb';
import FormButtons from './FormButtons';
import FormContainer from './FormContainer';


const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: 'User',
        link: `${process.env.NEXT_PUBLIC_HOST}/data/user`
    },
    {
        label: 'Form'
    }
]

const UpdateUserForm = ({ id, email, role, allRoles = [] }: UpdateUserType) => {

    const router = useRouter();

    const context = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateUserType>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: { email, role }
    });

    const refreshData = () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/user`);

    const onSubmit: SubmitHandler<UpdateUserType> = async (data) => {
        putClientApi({
            url: `${process.env.NEXT_PUBLIC_HOST}/api/users/${id}`,
            data: JSON.stringify(data),
            refreshData,
            context
        })
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
                            <label className="block mb-2 text-xs" htmlFor="name">Email</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.email ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                type="text"
                                placeholder="Email"
                                maxLength={50}
                                {...register("email", { onChange: valueToLowercase })}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-8 uppercase">
                            <label className="block mb-2 text-sm" htmlFor="name">Role</label>
                            <select
                                className={`w-full flex justify-start flex-wrap border rounded p-2 bg-white ${errors.role ? 'border-red-500' : 'border-slate-400'}`}
                                {...register("role")}>
                                {
                                    allRoles.map((role, _index) => {
                                        return <option key={role} className='p-3'>{role}</option>
                                    })
                                }
                            </select>
                            {errors.role && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.role?.message}
                                </p>
                            )}
                        </div>
                        <FormButtons onCancelHandler={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/user`)} />
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default UpdateUserForm
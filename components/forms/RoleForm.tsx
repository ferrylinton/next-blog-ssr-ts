import { useAppContext } from '@/context';
import { postClientApi, putClientApi } from '@/services/http-client';
import { RoleFormType } from '@/types/role-type';
import { valueToUppercase } from '@/utils/form';
import { CreateRoleSchema } from '@/validations/role-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Breadcrumb from '../Breadcrumb';
import FormButtons from './FormButtons';
import FormContainer from './FormContainer';


const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: 'Role',
        link: `${process.env.NEXT_PUBLIC_HOST}/data/role`
    },
    {
        label: 'Form'
    }
]

const RoleForm = ({ id, name, authorities, allAuthorities }: RoleFormType) => {

    const router = useRouter();

    const context = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RoleFormType>({
        resolver: zodResolver(CreateRoleSchema),
        defaultValues: { name, authorities }
    });

    const refreshData = () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/role`);

    const onSubmit: SubmitHandler<RoleFormType> = async (data) => {
        if (id) {
            putClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/roles/${id}`,
                data: JSON.stringify(data),
                refreshData,
                context
            })
        } else {
            postClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/roles`,
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
                        <div className="mb-8 uppercase">
                            <label className="block mb-2 text-sm" htmlFor="name">Authorities</label>
                            <div className={`flex justify-start flex-wrap border rounded p-2 bg-white ${errors.authorities ? 'border-red-500' : 'border-slate-400'}`}>
                                {
                                    allAuthorities?.map((authority, _index) => {
                                        return <div className="min-w-[190px] mb-[1rem] min-h-[1.5rem] pl-[1.5rem] flex justify-start items-center" key={authority}>
                                            <input
                                                type="checkbox" {...register("authorities")} value={authority}
                                                className="relative float-left -ml-[1.5rem] mr-[3px] mt-[0.15rem] h-[1.5rem] w-[1.5rem] rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 "
                                            />
                                            <label className="inline-block pl-[0.15rem] hover:cursor-pointer me-5 text-sm">
                                                {authority}
                                            </label>
                                        </div>
                                    })
                                }
                            </div>
                            {errors.authorities && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.authorities?.message}
                                </p>
                            )}
                        </div>
                        <FormButtons onCancelHandler={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/role`)} />
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default RoleForm
import { useAppContext } from '@/context';
import ImageIcon from '@/icons/ImageIcon';
import UploadIcon from '@/icons/UploadIcon';
import { postFormDataClientApi, putFormDataClientApi } from '@/services/http-client';
import { ImageFormType } from '@/types/image-type';
import { valueToLowercase, valueToUppercase } from '@/utils/form';
import { CreateImageSchema } from '@/validations/image-schema';
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import Breadcrumb from '../Breadcrumb';
import FormButtons from './FormButtons';
import FormContainer from './FormContainer';



const breadcrumbItems: BreadcrumbItem[] = [
    {
        label: 'Image',
        link: `${process.env.NEXT_PUBLIC_HOST}/data/image`
    },
    {
        label: 'Form'
    }
]

const ImageForm = ({ id, slug, file }: ImageFormType) => {

    const router = useRouter();

    const context = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ImageFormType>({
        resolver: zodResolver(CreateImageSchema),
        defaultValues: { slug, file }
    });

    const refreshData = () => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/image`);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        } else {
            setSelectedFile(e.target.files[0]);
        }
    };

    const onClickFile = (e: React.MouseEvent<HTMLInputElement>) => {
        e.currentTarget.value = "";
        setSelectedFile(null);
    };

    const onSubmit: SubmitHandler<ImageFormType> = async (data) => {
        console.log(data);
        if (id) {
            putFormDataClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/images/${id}/upload`,
                data,
                refreshData,
                context
            })
        } else {
            postFormDataClientApi({
                url: `${process.env.NEXT_PUBLIC_HOST}/api/images/upload`,
                data,
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
                            <label className="block mb-2 text-sm" htmlFor="slug">Slug</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${errors.slug ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                type="text"
                                placeholder="NAME"
                                maxLength={50}
                                {...register("slug", { onChange: valueToLowercase })}
                            />
                            {errors.slug && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.slug?.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-8">
                            <div className="block mb-2 text-sm uppercase">Image</div>
                            <label htmlFor='file' className="h-[50px] flex justify-center items-center gap-2 border border-slate-400 rounded cursor-pointer hover:bg-slate-100">
                                <UploadIcon className='w-[24px] h-[24px]' />
                                <span className="leading-none">Select an image</span>
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    onClick={onClickFile}
                                    className="hidden"
                                    {...register("file", { onChange: onFileChange })}
                                />
                            </label>
                            <div className='flex justify-center items-center w-full mt-1  p-2 border border-slate-400 rounded bg-white'>
                                {
                                    (selectedFile) ?
                                        (<div className='flex flex-col justify-center items-center w-full'>
                                            <div className='w-full h-[300px] relative'>
                                                <Image src={URL.createObjectURL(selectedFile)} fill className="object-cover rounded" alt="Uploaded Image" />
                                            </div>
                                            <div className='mt-2 text-xs'>{selectedFile?.name}</div>
                                        </div>)
                                        :
                                        (<div className='my-6'>
                                            <ImageIcon className='w-[100px] h-[100px] text-slate-300' />
                                            <div className='text-center text-slate-400'>No Image</div>
                                        </div>)
                                }
                            </div>

                        </div>

                        <FormButtons onCancelHandler={() => router.push(`${process.env.NEXT_PUBLIC_HOST}/data/image`)} />
                    </form>
                </div>
            </FormContainer>
        </>
    )
}

export default ImageForm
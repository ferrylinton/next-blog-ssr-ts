import Breadcrumb from '@/components/Breadcrumb';
import ButtonActions from '@/components/ButtonActions';
import DataContainer from '@/components/DataContainer';
import DataToolbar from '@/components/DataToolbar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import EmptyDataRow from '@/components/EmptyDataRow';
import ErrorContainer from '@/components/ErrorContainer';
import Searchbox from '@/components/Searchbox';
import * as imageService from "@/services/image-service";
import { ImageType } from '@/types/image-type';
import { getLogger } from '@/utils/logger';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  pageable: Pageable<ImageType>,
  error: ErrorInfoType | null,
}

const logger = getLogger('data-image-index');

const ImagePage = ({ pageable, error }: Props) => {

  const [showConfirm, setShowConfirm] = useState(false);

  const [deleteApiUrl, setDeleteApiUrl] = useState('');

  const showDeleteConfirmation = (id: string) => {
    setDeleteApiUrl(`${process.env.NEXT_PUBLIC_HOST}/api/images/${id}`)
    setShowConfirm(true);
  }

  const convertBase64 = (data: any) => {
    const buffer = Buffer.from(data, 'base64');
    return buffer.toString()
  }

  if (error)
    return <ErrorContainer code={error.code} message={error.message} label={'Image'} />
  else
    return (
      <>
        <Breadcrumb label={'Image'} />
        <DataContainer>
          <Searchbox keyword={pageable.keyword} />
          <div className='flex justify-center items-center flex-wrap gap-3 sm:border-y border-slate-300 sm:py-5 px-2 sm:px-0'>
            {
              (pageable.items.length === 0) ?
                (<div className='w-full border border-slate-300 rounded text-center p-3 '>Data is empty</div>) :
                (pageable.items.map((image, _index) => {
                  return (<div key={image.id} className='flex flex-col border border-slate-300 rounded  hover:outline outline-4 outline-blue-300'>
                    <div className='p-1'>
                      <div className='flex justify-center items-center bg-white w-[200px] h-[200px] relative'>
                        {
                          (image.imageType === 'image/svg+xml') ?
                            <img src={image.url}></img>
                            :
                            <Image src={image.url}
                              fill
                              quality={65}
                              priority={false}
                              sizes="(max-width: 768px) 100vw"
                              className='break-words bg-white object-contain'
                              alt={image.url}
                            />
                        }
                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-center border-t border-slate-300 bg-slate-100 py-1 '>
                      <div className='text-xs pb-1'>{image.slug}</div>
                      <ButtonActions
                        editPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/image/form/${image.id}`}
                        showDeleteConfirmation={() => showDeleteConfirmation(image.id)} />
                    </div>
                  </div>)
                }))
            }
          </div>

          <DataToolbar
            keyword={pageable.keyword}
            page={pageable.page}
            totalPage={pageable.totalPage}
            formPageUrl={`${process.env.NEXT_PUBLIC_HOST}/data/image/form`} />
        </DataContainer>
        <DeleteConfirmDialog
          showConfirm={showConfirm}
          setShowConfirm={setShowConfirm}
          url={deleteApiUrl} />
      </>
    )

}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { keyword, page } = query;
    const pageable = await imageService.find({ keyword, page });

    return {
      props: {
        pageable: JSON.parse(JSON.stringify(pageable))
      }
    };
  } catch (error: any) {
    logger.error(error);
    return {
      props: {
        error: {
          code: 500,
          message: error.message
        }
      }
    };
  }
};

export default ImagePage
import PostList from '@/components/PostList';
import { PostType } from '@/types/post-type';
import { GetServerSideProps } from 'next';
import * as postService from "@/services/post-service";
import { getLogger } from '@/utils/logger';
import PostPagination from '@/components/PostPagination';
import WarningIcon from '@/icons/WarningIcon';
import SimpleBox from '@/components/SimpleBox';
import EmptyIcon from '@/icons/EmptyIcon';


type Props = {
    pageable: Pageable<PostType>,
    error: ErrorInfoType | null,
}

const logger = getLogger('index');

const HomePage = ({ pageable, error }: Props) => {

    if (error)
        return (<SimpleBox>
            <div className='flex justify-center items-center w-full px-3 sm:px-5'>
                <div className='border-r border-slate-600 pr-2 mr-2 sm:pr-4 sm:mr-4'><WarningIcon className='w-[40px] h-[40px' /></div>
                <div className='text-sm sm:text-base'>{error.message}</div>
            </div>
        </SimpleBox>)

    if (!pageable || pageable.items.length === 0)
        return (<SimpleBox>
            <div className='flex justify-center items-center w-full px-3 sm:px-5 text-slate-600'>
                <div className='border-r border-slate-600 pr-2 mr-2 sm:pr-4 sm:mr-4'><EmptyIcon className='w-[40px] h-[40px' /></div>
                <div className='text-xl font-light uppercase leading-none text tracking-tight'>No post is found</div>
            </div>
        </SimpleBox>)


    return (
        <div className="h-full w-full flex justify-start items-start flex-wrap pt-16 lg:pt-6 pb-6">
            <PostList pageable={pageable} />
            {
                (pageable.totalPage > 1) && <PostPagination page={pageable.page} totalPage={pageable.totalPage} />
            }
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const { keyword, page } = query;
        const pageable = await postService.find({ keyword, page });

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

export default HomePage
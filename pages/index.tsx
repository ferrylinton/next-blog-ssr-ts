import PostList from '@/components/PostList';
import { PostType } from '@/types/post-type';
import { GetServerSideProps } from 'next';
import * as postService from "@/services/post-service";
import { getLogger } from '@/utils/logger';
import PostPagination from '@/components/PostPagination';


type Props = {
    pageable: Pageable<PostType>,
    error: ErrorInfoType | null,
}

const logger = getLogger('index');

const HomePage = ({ pageable, error }: Props) => {

    return (
        <div className="h-full w-full flex justify-start items-start flex-wrap pt-16 lg:pt-6 pb-6">
            <PostList pageable={pageable} />
            <div className='px-3'>
            <PostPagination 
                 page={pageable.page}
                 totalPage={pageable.totalPage} />
            </div>
            
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
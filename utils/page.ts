export const PER_PAGE: number = 10;

export const getPageParams = ({ keyword, page }: PageParamsType): { page: number, keyword: string } => {
    const pageInteger = (page && typeof page === 'string') ? parseInt(page as string) : 1;
    const keywordString = (keyword && typeof keyword === 'string') ? keyword as string : '';

    return {
        page: pageInteger,
        keyword: keywordString
    }
}

export const getTotalPage = (totalData: number): number => {
    const remaining = totalData % PER_PAGE;
    const totalPage = parseInt((totalData / PER_PAGE).toString());

    if (remaining === 0) {
        return totalPage
    } else {
        return totalPage + 1;
    }
}
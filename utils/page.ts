export const PER_PAGE: number = 10;

export const getTotalPage = (totalData : number): number => {
    const remaining = totalData % PER_PAGE;
    const totalPage = parseInt((totalData / PER_PAGE).toString());

    if(remaining === 0){
        return totalPage
    }else{
        return totalPage + 1;
    }
}
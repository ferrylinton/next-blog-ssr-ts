type PostType = {
    id: string,
    slug: string,
    title: string,
    description: string,
    content: string,
    tags: TagType[]
}

type PostFormType = {
    id?: string,
    slug: string,
    title: string,
    description: string,
    content: string,
    tags: String[],
    allTags: string[]
}
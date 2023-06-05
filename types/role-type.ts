type RoleType = {
    id: string,
    name: string,
    authorities: AuthorityType[],
    createdAt: string,
    updatedAt: string
}

type RoleFormType = {
    id?: string,
    name: string,
    authorities: string[],
    allAuthorities?: string[]
}
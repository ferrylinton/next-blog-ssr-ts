type RoleType = {
    id: string,
    name: string,
    authorities: AuthorityType[],
    createdAt: string,
    updatedAt: string
}

type CreateRoleType = {
    id?: string,
    name: string,
    authorities: string[]
}
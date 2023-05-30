type RoleType = {
    id?: string,
    name: string,
    authorities: AuthorityType[]
}

type CreateRoleType = {
    id?: string,
    name: string,
    authorities: string[]
}
type UserType = {
    id: string,
    email: string,
    password: string,
    loginAttempt: number,
    activated: boolean,
    locked: boolean,
    createdAt: string,
    updatedAt: string
}

type CreateUserType = {
    email: string
    password: string,
    passwordConfirm: string,
    role: string,
    allRoles: string[]
}

type UpdateUserType = {
    id: string,
    email: string
    role: string,
    allRoles: string[]
}
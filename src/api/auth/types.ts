export type AuthInput = {
    email: string,
    password: string
}

export type AuthDetails = {
    token : string | null,
    user : UserDetails | null
}

export type UserDetails = {
    userId : string,
    email : string,
    role : string,
    state : string,
    createdAt : Date,
    permissions : Array<string>
}

export type AuthUser = {
    userId: string,
    email: string,
    role: string,
    permissions : Array<string>

}

export type JWT = {
    userId: string,
    email: string,
    role: string,
    claims: {[index: string]: Array<string>}
}
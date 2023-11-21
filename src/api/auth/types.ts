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
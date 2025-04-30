export type NewUser = {
    name: string,
    username: string,
    email: string,
    password: string,
}

export type User = {
    id: string,
    name: string,
    username: string,
    email: string,
    imageUrl: string,
    bio: string
}

export type NavLinkTypes = {
    imgUrl: string,
    route: string,
    label: string
}

export type NewPost = {
    userId: string,
    caption: string,
    file: File[],
    location?: string,
    tags?: string
}
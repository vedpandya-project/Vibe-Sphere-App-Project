import { NewPost, NewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { ID, ImageGravity, Query } from "appwrite";

export async function createUserAccount(user: NewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )

        if (!newAccount) throw Error

        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        })

        return newUser;
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function saveUserToDB(user: {
    accountId: string,
    email: string,
    name: string,
    imageUrl: URL,
    username?: string,
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user
        )

        return newUser;
    } catch (error) {
        console.log(error)
    }
}

export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createEmailPasswordSession(
            user.email, 
            user.password
        )

        return session
    } catch (error) {
        console.log(error)
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get()

        return currentAccount
    } catch (error) {
        console.log(error)
        return null;
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount()

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId, [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

// Sign Out
export async function signOutAccount() {
    try {
        const session = await account.deleteSession("current")

        return session
    } catch (error) {
        console.log(error)
    }
}

// POST

// 1. Create Post
export async function createPost(post: NewPost) {
    try {
        // Upload file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0])
        
        if(!uploadedFile) throw Error

        // File Url
        const fileUrl = getFilePreview(uploadedFile.$id)

        if(!fileUrl) {
            await deleteFile(uploadedFile.$id)
            throw Error
        }

        const tags = post.tags?.replace(/ /g, "").split(",") || []

        const newPost = await databases.createDocument(appwriteConfig.databaseId,
            appwriteConfig.postCollectionId, ID.unique(), {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            }
        )

        if(!newPost) {
            await deleteFile(uploadedFile.$id) 
            throw Error
        }

        return newPost
    } catch (error) {
        console.log(error)
    }
}

// Upload file
export async function uploadFile(file: File) {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId, ID.unique(), file
        )

        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

// Get the Url
export function getFilePreview(fileId: string) {
    try {
        const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000,
            2000, ImageGravity.Top, 100)

            if(!fileUrl) throw Error

            return fileUrl;
    } catch (error) {
        console.log(error)
    }
}

// Delete file
export async function deleteFile(fileId: string) {
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId)

        return { status: "ok"}
    } catch (error) {
        console.log(error)
    }
}

// Get Recent Posts
export async function getRecentPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(20)]
        )

        if(!posts) throw Error

        return posts
    } catch (error) {
        console.log(error)
    }
}
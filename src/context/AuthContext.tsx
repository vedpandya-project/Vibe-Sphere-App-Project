import { getCurrentUser } from "@/lib/appwrite/api"
import { User } from "@/types"
import React, { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
}

const INITIAL_STATE: ContextType = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => { },
    setIsAuthenticated: () => { },
    checkAuthUser: async () => false as boolean
}

type ContextType = {
    user: User
    isLoading: boolean
    isAuthenticated: boolean
    setUser: React.Dispatch<React.SetStateAction<User>>
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    checkAuthUser: () => Promise<boolean>
}

const AuthContext = createContext(INITIAL_STATE)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async () => {
        setIsLoading(true)

        try {
            const currentAccount = await getCurrentUser()

            if (currentAccount) {
                setUser({
                    id: currentAccount.$id,
                    name: currentAccount.name,
                    username: currentAccount.username,
                    email: currentAccount.email,
                    imageUrl: currentAccount.imageUrl,
                    bio: currentAccount.bio,
                })

                setIsAuthenticated(true)

                return true
            }
            return false;
        } catch (error) {
            console.log(error)

            return false;
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback")

        if (cookieFallback === "[]" ||
            cookieFallback === null || 
            cookieFallback === undefined
        ) 
        {
            navigate("/sign-in")
        }

        checkAuthUser()
    }, [])

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useUserContext = () => useContext(AuthContext)
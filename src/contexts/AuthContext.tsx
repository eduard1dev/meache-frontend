import { createContext, useState, useEffect, Dispatch } from "react";
import { parseCookies } from "nookies";
import { useRouter } from 'next/router';
import { api } from "../services/api";


interface IUser {
    name: string,
    hasWhatsappLink: boolean
}

interface IAuthUser {
    userId: string
};

interface IAuthContext {
    isAuthenticated: boolean,
    user: IUser,
    setUser: Dispatch<any>;
}

export const AuthContext = createContext({} as IAuthContext)

export const AuthProvider = ({children}) => {

    const route = useRouter();
    const [user, setUser] = useState(null)

    const isAuthenticated = !!user

    const getUserData = async () => {
        try {
            const response = await api.get('/api/user')
            setUser(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies()

        /* if (token) {
            getUserData()
        }

        if (!!user && route.asPath == '/') {
            route.push('/Home')
        } */
        
        console.log("verify",route.asPath)
        if (token || route.asPath == "/verify") {
            console.log(token, "verify",route.asPath)
        } else {
            route.push('/')
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, isAuthenticated, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}
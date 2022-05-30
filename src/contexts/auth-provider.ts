import React, {FC, useEffect, useState} from "react";
import {AuthContext} from "./auth-context";

interface AuthUser{
    userName?:string
    isAdmin?:boolean
}

const AuthProvider=({children})=> {


    const [user, setUser] = useState<AuthUser>();

    useEffect(() => {
        setUser({
            userName: 'Guest',
            isAdmin: false
        });
    }, [])

    const context = {
        authUser: user
    };

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}
export default AuthProvider

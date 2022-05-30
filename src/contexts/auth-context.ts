import {createContext} from "react";

export interface  AuthContextType{
    userName?:string
    isAdmin?:boolean
}
 export const AuthContext=createContext<AuthContextType>({
     userName: 'Guest',
     isAdmin: false
 });

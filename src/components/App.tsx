import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SiteManger from "./site/SiteManger";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SiteShowcase from "./site/SiteShowcase";
import SiteReport from "./site/SiteReport";
import UserService from "../services/user-service";
import {getRoles} from "@testing-library/react";
import { Auth0Provider } from "@auth0/auth0-react";
import SignInoIdc from "./site/SignInOidc";

export interface AuthUser {
    userName?:string,
    isAdmin?:boolean,
    isAuthenticated?:boolean
};

export const UserContext=createContext<AuthUser>({});

const App=()=> {

    const [authUser,setAuthUser]=useState<AuthUser>({
        userName:'guest',
        isAdmin:false,
        isAuthenticated:false
    })

    useEffect(()=>{
        let scv=new UserService();
        (async ()=>{
            const user=await scv.getUser();
            if (user) {
                setAuthUser({
                    userName: user?.profile.name,
                    isAdmin: user?.profile.role && user?.profile.role == 'UpiManager',
                    isAuthenticated: !user?.expired
                })
            }else {
                setAuthUser({
                    userName: 'guest',
                    isAdmin: false,
                    isAuthenticated: false
                });
            }
        })();

    },[]);

    return (
        <Auth0Provider
            domain="dev-g7ipfo7nhnq68xtm.us.auth0.com"
            clientId="yWMUkKOqvL28hdJXjY1ZXnws09WQxGyK"
            redirectUri="https://127.0.0.1:3000/signin-oidc"
        >
        <UserContext.Provider value={authUser}>
            <Header/>
            <BrowserRouter basename={process.env.REACT_APP_CRS_BASENAME}>

                <Routes>
                    <Route path="/" element={<SiteReport/>}/>
                    <Route path="/site/:siteCode" element={<SiteShowcase/>}/>
                    <Route path="/manage" element={<SiteManger/>}/>

                    <Route path="/signin-oidc" element={<SignInoIdc/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </UserContext.Provider>
        </Auth0Provider>

    );
}

export default App;

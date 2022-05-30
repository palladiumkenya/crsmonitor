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
                console.log('>>>>>', user);
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
        <UserContext.Provider value={authUser}>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SiteReport/>}/>
                    <Route path="/site/:siteCode" element={<SiteShowcase/>}/>
                    <Route path="/manage" element={<SiteManger/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </UserContext.Provider>
    );
}

export default App;

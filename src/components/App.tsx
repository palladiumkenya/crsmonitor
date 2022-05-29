import React from 'react';
import './App.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SiteManger from "./site/SiteManger";
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";
import UserService from "../services/user-service";
import SiteShowcase from "./site/SiteShowcase";
import {GuardedRoute, GuardProvider} from "react-router-guards";
import NotFound from "./NotFound";


const userService = new UserService();

const RequireLogin = async () => {
    let user=await userService.getUser();
    if(!user)
        await  userService.login();
};

const App=()=> {
    return (
        <div>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SiteManger/>}/>
                    <Route path="/site/:siteCode" element={<SiteShowcase/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}

export default App;

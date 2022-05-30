import React from 'react';
import './App.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SiteManger from "./site/SiteManger";
import {HashRouter,  Link, Outlet, Route, Routes} from "react-router-dom";
import UserService from "../services/user-service";
import SiteShowcase from "./site/SiteShowcase";
import {GuardedRoute, GuardProvider} from "react-router-guards";
import NotFound from "./NotFound";
import SiteReport from "./site/SiteReport";


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
            <HashRouter>
                <Routes>
                    <Route path="/" element={<SiteReport/>}/>
                    <Route path="/site/:siteCode" element={<SiteShowcase/>}/>
                    <Route path="/manage" element={<SiteManger/>}/>
                </Routes>
            </HashRouter>
            <Footer/>
        </div>
    );
}

export default App;

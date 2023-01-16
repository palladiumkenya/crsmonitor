import React from 'react';
import './App.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SiteManger from "./site/SiteManger";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SiteShowcase from "./site/SiteShowcase";
import SiteReport from "./site/SiteReport";

const App = () => {
    return (
        <div>
            <Header/>
            <BrowserRouter basename={process.env.REACT_APP_CRS_BASENAME}>
                <Routes>
                    <Route path="/" element={<SiteReport/>}/>
                    <Route path="/site/:siteCode" element={<SiteShowcase/>}/>
                    <Route path="/manage" element={<SiteManger/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </div>
    );
}

export default App;

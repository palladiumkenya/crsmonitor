import React from 'react';
import logo from '../logo.svg';
import './App.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SiteManger from "./site/SiteManger";

const App=()=> {
    return (
        <div>
            <Header/>
            <SiteManger/>
            <Footer/>
        </div>
    );
}

export default App;

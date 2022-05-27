import React from 'react';
import './App.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import SiteManger from "./site/SiteManger";
import {Link, Outlet} from "react-router-dom";

const App=()=> {
    return (
        <div>
            <SiteManger/>
        </div>
    );
}

export default App;

import React from "react";
import UserService from "../../services/user-service";

const scv=new UserService();

const Header=()=> {
    return (
        <header>
            <h1>DWAPI Client Registry Upload Tracker</h1> {scv.isAuthenticated() ? <a onClick={() => scv.logout()}>SignOut</a> :
            <a onClick={() => scv.login()}>Sign In</a>}
            <hr/>
        </header>)
}
export default Header;

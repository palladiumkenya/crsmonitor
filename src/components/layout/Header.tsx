import React from "react";
import {Button} from "primereact/button";
import {useAuth0} from "@auth0/auth0-react";

const Header = () => {

    const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0();

    const UserInfo = () => {
        if (isAuthenticated) {
            return <Button onClick={() => logout({returnTo: window.location.origin})}> Log
                Out {user && user.name} </Button>
        }
        return <Button onClick={() => loginWithRedirect()}>Log In</Button>
    }

    return (
        <header>
            <h1>DWAPI Client Registry Upload Tracker</h1>
            <UserInfo/>
            <hr/>
        </header>)
}
export default Header;

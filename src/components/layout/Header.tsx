import React, {useContext, useEffect, useState} from "react";
import UserService from "../../services/user-service";
import {User} from "oidc-client";
import {Button} from "primereact/button";
import {UserContext} from "../App";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";


const scv=new UserService();

const Header=()=> {
    const authUser = useContext(UserContext);
    const { loginWithRedirect, logout,isAuthenticated, user } = useAuth0();
    /*const [user,setUser]=useState<User>()
    useEffect(()=>{
        (async ()=>{

            const scv=new UserService();

            if (scv.isAuthenticated()){
                const loggedInUser=await scv.getUser()
                console.log('>>',loggedInUser);
                if (loggedInUser)
                {
                    setUser(loggedInUser);
                    console.log('USERS',loggedInUser);
                }
            }
        })();
        return () => {
        };
    },[])*/

    const UserInfo=()=>{
        if(isAuthenticated)
        {
            return <Button onClick={()=>logout({ returnTo: window.location.origin })}> Log Out {user && user.name} </Button>
        }
        return <Button onClick={()=>loginWithRedirect()}>Log In</Button>
    }

    return (
        <header>
            <h1>DWAPI Client Registry Upload Tracker</h1>
            <UserInfo/>
            <hr/>

        </header>)
}
export default Header;

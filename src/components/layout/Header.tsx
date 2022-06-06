import React, {useContext, useEffect, useState} from "react";
import UserService from "../../services/user-service";
import {User} from "oidc-client";
import {Button} from "primereact/button";
import {UserContext} from "../App";

const scv=new UserService();

const Header=()=> {
    const authUser = useContext(UserContext);

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
        if(authUser.isAuthenticated)
        {
            return <Button onClick={()=>scv.logout()}> Log Out {authUser.userName}</Button>
        }
        return <Button onClick={()=>scv.login()}>Log In</Button>
    }

    return (
        <header>
            <h1>DWAPI Client Registry Upload Tracker</h1>
            <UserInfo/>
            <hr/>

        </header>)
}
export default Header;

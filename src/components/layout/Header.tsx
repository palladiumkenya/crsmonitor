import React, {useEffect, useState} from "react";
import UserService from "../../services/user-service";
import {User} from "oidc-client";
import {Button} from "primereact/button";




const Header=()=> {
    const [user,setUser]=useState<User>()
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
    },[])

    const UserInfo=()=>{
        const scv=new UserService();
        if(user)
        {
            return <Button onClick={()=>scv.logout()}> Log Out</Button>
        }
        return <Button onClick={()=>scv.login()}>Log In</Button>
    }

    return (
        <header>
            <h1>DWAPI Client Registry Upload Tracker {user?.access_token} </h1>
            <UserInfo/>
            <hr/>

        </header>)
}
export default Header;

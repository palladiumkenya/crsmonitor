import React, {FC, useEffect, useState} from "react";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";




const SignInoIdc=()=> {
    const { isAuthenticated, user } = useAuth0();

    if(isAuthenticated==true) {
        window.location.href = 'manage';
    }


    return (
        <div>
            Redirecting...
        </div>
    )
}

export default SignInoIdc;

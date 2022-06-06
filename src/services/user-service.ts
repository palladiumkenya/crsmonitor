import {Log, User, UserManager} from "oidc-client";

const config = {
    authority: process.env.REACT_APP_CRS_AUTHORITY,
    client_id: process.env.REACT_APP_CRS_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_CRS_REDIRECT_URI,
    response_type: process.env.REACT_APP_CRS_RESPONSE_TYPE,
    scope: process.env.REACT_APP_CRS_SCOPE,
    // silent_redirect_uri: process.env.REACT_APP_CRS_SILENT_REDIRECT_URI,
    post_logout_redirect_uri: process.env.REACT_APP_CRS_POST_LOGOUT_REDIRECT_URI
};

class UserService {
    public userManager: UserManager;

    constructor() {
        this.userManager = new UserManager(config);
        Log.logger = console;
        Log.level = Log.INFO;
    }

    public getUser(): Promise<User | null> {
        return this.userManager.getUser();
    }

    public login(): Promise<void> {
        return this.userManager.signinRedirect();
    }


    public renewToken(): Promise<User> {
        return this.userManager.signinSilent();
    }

    public logout(): Promise<void> {
        return this.userManager.signoutRedirect();
    }

    public  isAuthenticated() {
        let loggedIn = false;
        this.getUser().then((user)=>{
            if (user&&!user.expired)
            {
                loggedIn=true;
            }
        })
        return loggedIn;
    }
}

export default UserService;

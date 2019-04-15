import { 
    CognitoUserPool, 
    CognitoUser, 
    AuthenticationDetails, 
    CognitoUserAttribute } from 'amazon-cognito-identity-js';

    
const POOL_DATA = {
    UserPoolId: 'us-east-1_W3XvkuFT6',
    ClientId: '3v1dnd9m8eb0okj68m4luf95ba'
}
const userPool = new CognitoUserPool(POOL_DATA);

export const APIUrl = 'https://eyy66lnk8e.execute-api.us-east-1.amazonaws.com/dev';


export const onSignIn = (username, password, history) => {
    const authData = {
        Username: username,
        Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
        Username: username,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    
    cognitoUser.authenticateUser(authDetails, {
        onSuccess () {
            history.push({pathname: '/form'});
        },
        onFailure (error) {
            console.log('Sign in fail');
            console.log(error);
        },
        mfaRequired () {
            console.log('mfaRequire');
        },
        newPasswordRequired () {
            console.log('New Password Require');
            history.push({pathname: '/newpassword'})
        }
        
    });
    
}

export const newPassword = (username, oldPassword, newPassword, history) => {
    const authData = {
        Username: username,
        Password: oldPassword
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
        Username: username,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authDetails, {
        onSuccess () {
            console.log('User has successfully sign in');
            history.push({pathname: '/form'});
        },
        onFailure (error) {
            console.log('Sign in fail');
            console.log(error);
        },
        mfaRequired () {
            console.log('mfaRequire');
        },
        newPasswordRequired () {
            console.log('New Password Require');
            cognitoUser.completeNewPasswordChallenge(newPassword);
            history.push({pathname: '/signin'});
        }
        
    });
}

export const onSignOut = () => {
    const user = userPool.getCurrentUser();
    if(user !== null){
        user.signOut();
    }  

}

export const isAuthenticated = () => {
    const user = userPool.getCurrentUser();
    if(user == null) return false;
    const result = user.getSession((err, session) => {
        if (err) {
            return false;
        } else {
            if (session.isValid()) {
                console.log();
                return true;
            } else {
                return false;
            }
        }
    })

    return result;
}

export const registerUser = (username, email, password) => {
    const user = {
        username: username,
        email: email,
        password: password
    };
    const attriList = [];
    const emailAttribute = {
        Name: 'email',
        Value: email
    }
    attriList.push(new CognitoUserAttribute(emailAttribute));
    userPool.signUp(user.username, user.password, attriList, null, (err, result) => {
        if (err) {
            console.log('Register fail ' + err);
        } else {
            console.log('Successfully register');
        }
        
    });
}

export const confirmUser = (username, code) => {
    const userData = {
        Username: username,
        Pool: userPool
    };

    const cognitUser = new CognitoUser(userData);
    cognitUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
            console.log('Error');
            console.log(err);
        } else {
            console.log('Success');
            console.log(result)
        }
    });
}



export const getJwtToken = () => {
    const user = userPool.getCurrentUser();
    if(user == null) return null;
    return user.getSession((err, session) => {
        if( err) {
            return null;
        }
        return session.getIdToken().getJwtToken();
    })

}
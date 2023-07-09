import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../firebase-apps/firebase-config';

const {createContext, useContext, useState} = require('react')

const AuthContext = createContext();

function AuthProvider (props) {

    const [userInfo, setUserInfo] = useState({})
    const value = {userInfo, setUserInfo};
    useEffect(()=> {
        onAuthStateChanged(auth, (user) =>{
            setUserInfo(user);
        })
    }, [])

    return <AuthContext.Provider value={value} {...props}>

    </AuthContext.Provider>
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if(typeof context === 'underfined') 
    throw new Error ('useAuth must be used within AuthProvider');

    return context; 
}

export {AuthProvider, useAuth}
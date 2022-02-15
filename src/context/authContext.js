import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import '../firebase';

const authContext = React.createContext();

export const useAuth = () => useContext(authContext);

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurentUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // singup function
    async function singUp(email, password, userName) {
        const auth = getAuth();

        await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(auth.currentUser, {
            displayName: userName,
        });

        const user = auth.currentUser;
        setCurentUser({
            ...user,
        });
    }

    // login function
    function login(email, password) {
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout function
    function logout() {
        const auth = getAuth();
        return signOut(auth);
    }

    const value = {
        currentUser,
        singUp,
        login,
        logout,
    };

    return <authContext.Provider value={value}>{!loading && children}</authContext.Provider>;
};

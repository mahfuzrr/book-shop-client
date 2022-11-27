/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    // eslint-disable-next-line prettier/prettier
    updateProfile
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

import app from '../firebase/firebase.init';

export const AuthContext = createContext();

const auth = getAuth(app);

export default function UserContext({ children }) {
    const [user, setUser] = useState({ displayName: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (curUser) => {
            setUser(curUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const googleProvider = new GoogleAuthProvider();
    // googleProvider.addScope('email');

    const createUserUsingEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (name, photoUrl) => {
        let updatedName = '';
        let updatedUrl = '';

        if (name) updatedName = name;
        if (photoUrl) updatedUrl = photoUrl;

        return updateProfile(auth.currentUser, {
            displayName: updatedName,
            photoURL: updatedUrl,
        });
    };

    const signInUsingEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const deleteUser = (uid) => {
        setLoading(true);
        return getAuth().deleteUser(uid);
    };

    const authInfo = {
        user,
        createUserUsingEmail,
        signInUsingEmail,
        logOut,
        signInGoogle,
        loading,
        updateUser,
        deleteUser,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
}

import { useEffect, useState } from "react";
import initAuthentication from "../firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, getIdToken } from "firebase/auth";

initAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
        /* .then(result => {
            console.log(result.user);
            setUser(result.user);
        })
        .catch(error => {
            setError(error.message)
        }) */
    };

    // observe whether user Auth state changed or not
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user)
                    .then(idToken => localStorage.setItem('idToken', idToken))
                setUser(user);
            }
            setIsLoading(false);
        });
    }, []);

    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(result => {
                setUser({})
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return {
        user,
        error,
        isLoading,
        setIsLoading,
        logout,
        signInWithGoogle
    };
}

export default useFirebase;
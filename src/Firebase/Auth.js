import React, { useEffect, useState } from 'react';
import { auth, provider, signInWithPopup, signOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
    const[user, setUser]= useState(null);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user)
            console.log(result.user)
        } catch (error) {
            console.error("Error signing in with Google", error)
        }

    }

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            console.log("USer signed out");
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
        });
        return ()=> unsubscribe();
    }, [])

    return (
        <div className='login-signin'>{
            user ? (
            <>
             <img src={user.photoURL} alt='Profile' />
             <p className='user-text'>Welcome {user?.displayName}</p>
             <button className='user-text' onClick={handleLogOut}>Sign out</button>
            </> 
            ) : (
                <button className='user-text' onClick={handleGoogleSignIn}>Sign in</button>
            )}
        
        </div>
      
    );
};

export default Auth
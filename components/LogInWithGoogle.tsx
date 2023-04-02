import { auth } from '@/config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react'
import { FcGoogle } from 'react-icons/fc';


const provider = new GoogleAuthProvider();


const LogInWithGoogle = () => {

    const router = useRouter()


    // for google sign in
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential) {
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    router.push('/')
                }
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                window.alert("Error code: " + errorCode + "\n " + errorMessage)
                console.error("Error while creating account" + errorMessage);
            });
    }
    return (
        <button onClick={() => signInWithGoogle()} className='flex justify-center w-full gap-4 items-center font-nunito rounded-full my-4 p-3 shadow-lg bg-white text-lg border border-gray-100'>
            <FcGoogle size={25} />
            SignUp With Google
        </button>
    )
}

export default LogInWithGoogle
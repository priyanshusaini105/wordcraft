import { auth, database } from '@/config/firebase';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
 




const provider = new GoogleAuthProvider();



const isFirebaseError = (error: unknown): error is FirebaseError => {
    return (error as FirebaseError).code !== undefined;
}


const LogInWithGoogle = () => {

    const router = useRouter()


    // for google sign in
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            if (!result) {
                toast.warning('No user found');
                return;
            }
            const user = result.user;
            console.log(user)

            await set(ref(database, `users/${user.uid}/profile`), {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                role: "author",
                userId:user.uid
            });
            toast.success('Login Succussfully')
            router.push('/');
        } catch (error) {
            if (isFirebaseError(error)) {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`Error code: ${errorCode}\n ${errorMessage}`);
                console.error(`Error while creating account ${errorMessage}`);
            }
            else
            {
                console.error(error)
                router.push('/');
                }
        }
    }

    return (
        <button onClick={() => signInWithGoogle()} className='flex justify-center w-full gap-4 items-center font-nunito rounded-full my-4 p-3 shadow-lg bg-white text-lg border border-gray-100'>
            <FcGoogle size={25} />
            SignUp With Google            
        </button>
    )
}

export default LogInWithGoogle
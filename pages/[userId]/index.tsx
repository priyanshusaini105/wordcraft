import { ProfileContext } from '@/context'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebase';

const Profile = () => {
  const { name, email, photo, userId } = useContext(ProfileContext)
  const router = useRouter()
  const isMyProfile = userId === router.query.userId;

  const handleSignOut = () => {
    signOut(auth).then(() => {
      toast.success('Sign Out Successfully', { transition: Flip, position: 'top-center' })
    }).catch((error) => {
      // An error happened.
      console.error("Error While SignOut", {})
      toast.error("Error While SignOut", { transition: Flip, position: 'top-center' })
    });
  }

  if (isMyProfile) {
    return (
      <div className="flex justify-between p-5">
        <ToastContainer />
        <section className="m-5 md:m-10">
          <h1 className="text-4xl font-bold">Profile</h1>
          <div className="flex justify-center m-5">
            {photo !== "" ?
              <Image
                src={photo}
                alt="Unable to load Image"
                width={80}
                height={80}
                className='rounded-full'
              /> :
              <span className='text-white font-semibold text-3xl font-nunito w-16 h-16 uppercase no-underline bg-primary rounded-full relative flex justify-center items-center'>{name ? name[0] : email[0]}</span>
            }
          </div>
          <div className="flex flex-col mt-4">
            <div className="flex items-center">
              <p className="text-gray-500">Name</p>
              <p className="ml-4">{name}</p>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-gray-500">Email</p>
              <p className="ml-4">{email}</p>
            </div>
          </div>
          <button className='text-lg font-nunito text-error bg-red-400/20 rounded-full w-full p-1 my-3 text-center' onClick={() => handleSignOut()}>Sign Out</button>
          <div className="flex flex-col mt-4">
            <Link href={`${userId}/published`} className="text-center duration-150 ease-in-out bg-primary text-accent hover:bg-accent hover:text-primary rounded-full  p-2 ">Published Posts</Link>
            <Link href={`${userId}/draft`} className="text-center duration-150 ease-in-out text-primary bg-accent hover:text-accent hover:bg-primary mt-2 rounded-full  p-2 ">Drafts Posts</Link>
          </div>

        </section>
        <Image
          src="/img/profile.svg"
          width={700}
          height={700}
          alt="Profile"
          className="-scale-x-100 hidden md:flex"
        />
      </div >
    );
  }
  return <>
    <ToastContainer />
    <Error statusCode={307} title='You can Not see this Profile' withDarkMode={false} />
  </>
}

export default Profile 

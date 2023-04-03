import { ProfileContext } from '@/context'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import Error from 'next/error';

const Profile = () => {
  const profileData=useContext(ProfileContext)
  const router = useRouter()
  const isMyProfile = profileData.userId === router.query.user;

  if (!isMyProfile) {

    return (
      <div className="flex justify-between">
      <section>
        <h1 className="text-4xl font-bold">Profile</h1>
        <p className="text-gray-500">This is your profile page</p>
        <div className="flex flex-col mt-4">
          <div className="flex items-center">
            <p className="text-gray-500">Name</p>
            <p className="ml-4">{profileData.name}</p>
          </div>
          <div className="flex items-center mt-4">
            <p className="text-gray-500">Email</p>
            <p className="ml-4">{profileData.email}</p>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <Link href={`user/${profileData.userId}/published`}>Published</Link>
          <Link href={`user/${profileData.userId}/drafts`}>Drafts</Link>
        </div>

      </section>
      <Image
        src="/img/profile.svg"
        width={700}
        height={700}
        alt="Profile"
        className="-scale-x-100 hidden md:flex"
      />
    </div>
  )
}
return <Error statusCode={307} />
}

export default Profile
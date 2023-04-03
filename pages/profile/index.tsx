import { ProfileContext } from '@/context'
import Image from 'next/image'
import React, { useContext } from 'react'

const Profile = () => {
  const profileData=useContext(ProfileContext)
  return (
    <div className="flex justify-between">
      <section>
        <h1 className="text-4xl font-bold">Profile</h1>
        
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

export default Profile
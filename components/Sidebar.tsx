import { IPostsData } from '@/types';
import Link from 'next/link'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'

interface IProps {
  blogPostTags: string[];
  posts: IPostsData
}

const Sidebar = ({ posts, blogPostTags }: IProps) => {
  // Create an array to store unique user IDs and their names
  const uniqueUsers:Array<{ userId: string, name: string }> = [];

  // Iterate over the posts and add each unique userId to the array
  Object.values(posts).forEach(post => {
    const user = uniqueUsers.find(u => u.userId === post.userId);
    if (!user) {
      uniqueUsers.push({ userId: post.userId, name: post.author });
    }
  });

  return (
    <section className='px-5'>
      <h3 className='text-2xl font-semibold font-nunito m-2'>
        <span className='bg-primary p-2 text-white'>Top</span> Authors
      </h3>
      <hr className='my-2' />
      <div className='flex flex-col gap-2'>
        {/* Iterate over the unique user IDs and display a link for each */}
        {uniqueUsers.map(user => (
          <Link key={user.userId} href={`/${user.userId}`} className='flex items-center gap-3 my-3'>
            <FaUserCircle size={38} color='#4A7C59' />
            <h3>{user.name}</h3>
          </Link>
        ))}
      </div>
      <hr />
      <div className='mt-16'>
        <h3 className='text-xl font-semibold font-nunito m-2'>
          <span className='bg-primary p-2 text-white'>Search</span> With Tags
        </h3>
        <div className=' flex flex-wrap flex-row p-2 pt-8'>
          {blogPostTags.slice(0, 6).map((tag, index) => (
            <p key={tag} className='bg-white text-primary border border-primary p-2 rounded-2xl text-sm m-2 w-fit'>
              {tag}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sidebar

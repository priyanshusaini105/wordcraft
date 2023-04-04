import { IPostsData } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegCalendarAlt, FaUserCircle } from 'react-icons/fa'
import Sidebar from './Sidebar'

const RenderPosts = ({posts}:{posts:IPostsData}) => {
    return (
        <section className='pt-10 px-5 bg-accent h-full w-full'>
            <h2 className='p-3'>
                <span className='bg-primary p-2 text-white'>Featured</span><span> This Months</span>
            </h2>
            <div className=' flex md:flex-row flex-col gap-2 justify-around'>
                <div className='flex flex-wrap gap-4 justify-around mx-5 m-5 md:w-7/12'>{Object.keys(posts).map(key => {
                    const post = posts[key];
                    return (
                        <Link href={"/" + post.userId+'/'+post.id} key={key} className='w-72 my-2'>
                            <span className='text-sm bg-white p-1 rounded-md text-primary shadow'>{post?.tags[0]}</span>
                            <h2 className='font-nunito my-2'>{post.title}</h2>
                            <Image src={post.image} width={500} height={300} alt={post.title} className='rounded-lg my-2' />
                            <div className='flex gap-2 items-center'>
                                <span className='text-xs flex gap-1'>
                                    <FaUserCircle size={18} />
                                    {post.author}
                                </span>
                                |
                                <span className='flex text-xs gap-1'>
                                    <FaRegCalendarAlt size={18} />
                                    {post.updatedAt}
                                </span>
                            </div>
                        </Link>
                    )
                })}</div>
                <div>
                    <Sidebar posts={posts} blogPostTags={[]}/>
                </div>
            </div>
        </section>
    )
}

export default RenderPosts
import React from 'react'
import blogData from '../../postData.json'
import Head from 'next/head'
import Image from 'next/image'
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import Link from 'next/link';

const Read = () => {
    return (
        <section className='container pt-10 px-5 bg-accent h-full w-screen'>
            <Head>
                <title>Read Posts | WordCraft</title>
            </Head>
            <h2 className='p-3'>
                <span className='bg-primary p-2 text-white'>Featured</span><span> This Months</span>
            </h2>
            <div>
                <div className='flex flex-wrap gap-4 justify-between mx-5 m-5 md:w-7/12'>{blogData.blogPosts.map((post, index) => {
                    return (
                        <Link href={"/read/"+post.url} key={post.id} className='w-72 my-2'>
                            <span className='text-sm bg-white p-1 rounded-md text-primary shadow'>{post.category}</span>
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
                                    {post.date}
                                </span>
                            </div>
                        </Link>
                    )
                })}</div>
                <div>
                </div>
            </div>
        </section>
    )
}

export default Read
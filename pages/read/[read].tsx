import React from 'react'
import postData from '../../postData.json'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Error from 'next/error'
import Image from 'next/image'
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import Link from 'next/link'
let blogPostTags = [
  "JavaScript",
  "Web Development",
  "HTML",
  "CSS",
  "Front-end Development",
  "Back-end Development",
  "Node.js",
  "React",
  "Angular",
  "Vue.js",
  "Database",
  "API",
  "Mobile Development",
  "User Experience",
  "User Interface",
  "Design",
  "Agile Methodology",
  "Product Management",
  "Artificial Intelligence",
  "Machine Learning"
];

const Posts = () => {
  const router = useRouter()
  const post = postData.blogPosts.filter(post => post.url === router.query.read)[0];
  console.log(router.query.read, postData.blogPosts[0].url)
  console.log(post)
  if (typeof post === "undefined")
    return <Error statusCode={404} title='Post Not Found' withDarkMode={false} />
  return (
    <section className='container flex gap-5 pt-5 md:pt-16 flex-col md:flex-row'>
      <Head>
        <title>{post.title ?? "Not Found"}</title>
      </Head>
      <section className='md:w-8/12 mx-4 md:mx-16'>
        <h1 className="text-4xl md:text-6xl font-semibold font-nunito m-2">{post.title}</h1>
        <hr />
        <div className='flex justify-between'>
          <div className='flex m-2 items-center gap-3'>
            <FaUserCircle size={18} />
            <span className='flex'>
              <p>Author:&nbsp;</p>
              <p>{post.author}</p>
            </span>
          </div>
          <div className='flex m-2 items-center gap-3'>
            <FaRegCalendarAlt size={18} />
            <span>Date: </span>
            <p>{post.date}</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <Image src={post.image} width={650} height={500} alt="Unable to load Image" className='m-6' />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>
      <section className='px-5 md:4/12'>
        <h3 className='text-2xl font-semibold font-nunito m-2'><span className='bg-primary p-2 text-white'>Top</span> Authors</h3>
        <hr className='my-2' />
        <div className='flex flex-col gap-2'>
          {postData.blogPosts.map(post => <Link key={post.id} href="" className='flex items-center gap-3 my-3'>
            <FaUserCircle size={38} color='#4A7C59' />
            <h3>{post.author}</h3>
          </Link>)}
        </div>
        <hr />
        <div className='mt-16'>
          <h3 className='text-xl font-semibold font-nunito m-2'>
            <span className='bg-primary p-2 text-white'>Search</span> With Tags</h3>
          <div className=' flex flex-wrap flex-col p-2 pt-8'>
            {blogPostTags.slice(0, 6).map((tag, index) => <p className='bg-accent text-secondary p-2 rounded-2xl text-sm m-2 w-fit'>{tag}</p>)}
          </div>
        </div>
      </section>
    </section>
  )
}

export default Posts
import React, { useState} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Error from 'next/error'
import Image from 'next/image'
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import Link from 'next/link'
import { equalTo, get, onValue, orderByChild, query, ref } from 'firebase/database'
import { database } from '@/config/firebase'
import { IPost, IPostsData } from '@/types'
import {Sidebar} from '@/components'
import { GetServerSideProps } from 'next'

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

const Posts = (props) => {
    console.log("Props",props)
    const router = useRouter()
    console.log("browswr",router.query)


    const { postId, userId } = router.query;

    const [post, setPost] = useState<IPost | null>(null)
    const [posts, setPosts] = useState<IPostsData | null>(null)


        onValue(ref(database, `users/${userId}/draft/${postId}`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val() as IPost;
                console.log(data)
                setPost(data);
            }else{
                console.log("post no found")
            }
        }, {
            onlyOnce: true
        })
        onValue(ref(database, `users/${userId}/draft/`), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val() as IPostsData;
                console.log(data)
                setPosts(data);
            }else{
                console.log("post no found")
            }
        }, {
            onlyOnce: true
        })

    
    // console.log({postId,userId})
    if (!post)
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
                        <p>{post.updatedAt}</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Image src={post.image} width={650} height={500} alt="Unable to load Image" className='m-6' />
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </section>
            <Sidebar posts={post} blogPostTags={blogPostTags}/>
        </section>
    )
}

export default Posts

// implementing getServerSideProps for server side fetching posts
export const getServerSideProps: GetServerSideProps = async (context) => {
    const userId  = context.query.userId ;
    console.log("context---",context)

    //   fetching data
    try {
        const postsRef = ref(database, 'publish');
        const postsQuery = query(postsRef, orderByChild('userId'), equalTo(userId));
        const snapshot = await get(postsQuery);
        if (snapshot.exists()) {
            const posts = snapshot.val() as IPost;
            return {
                props: {
                    posts,
                    userId
                }
            }
        } else {
            console.log("No posts available");
        }
    } catch (error) {
        console.error("Fire:--->",error);
    }

    return {
        props: {
            posts: {}
        }
    }
}
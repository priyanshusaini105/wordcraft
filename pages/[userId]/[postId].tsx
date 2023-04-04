import React from 'react'
import Head from 'next/head'
import Error from 'next/error'
import Image from 'next/image'
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import { child, get, ref } from 'firebase/database'
import { database } from '@/config/firebase'
import { Comment, ICommentsData, IPost, IPostQuery } from '@/types'
import { GetServerSideProps } from 'next'
import { CommentSection, Sidebar } from '@/components'

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


interface IPostProps{
    post: IPost;
     exist: boolean;
      postId: string;
      comments:Comment[] 
}

const Posts: React.FC<IPostProps> = ({ post, exist, postId,comments }) => {

    if (!exist)
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
                <section>
                    <CommentSection postId={postId} comments={comments} />
                </section>
            </section>
            <Sidebar posts={{}} blogPostTags={blogPostTags} />
        </section>
    )
}

export default Posts

// implementing getServerSideProps for server side fetching posts
export const getServerSideProps: GetServerSideProps = async (context) => {



    const { postId } = context.query as unknown as IPostQuery;
    let comments: Comment[] = [];

    //   fetching data

    
    try {
        const dbRef = ref(database);
        const postSnapshot = await get(child(dbRef, `/publish/${postId}`));
        const commentSnapshot = await get(child(dbRef, `/comments/${postId}`));

        if (postSnapshot.exists()) {

            // getting comments
            const post = postSnapshot.val() as IPost;
            if (commentSnapshot.exists()) {
                const commentsData=commentSnapshot.val() as ICommentsData;
                comments = Object.values(commentsData);
            }

            return {
                props: {
                    post,
                    exist: true,
                    postId,
                    comments
                }
            }


        } else {
            console.log("No posts available");
        }
    } catch (error) {
        console.error("Fire:--->", error);
    }

    return {
        props: {
            post: {},
            exist: false,
            postId,
            comments
        }
    }
}
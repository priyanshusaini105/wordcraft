import React from 'react'
import Error from 'next/error'
import { child, get, ref } from 'firebase/database'
import { database } from '@/config/firebase'
import { Comment, ICommentsData, IPost, IPostQuery } from '@/types'
import { GetServerSideProps } from 'next'
import { PostBody } from '@/components'



interface IPostProps {
    post: IPost;
    exist: boolean;
    postId: string;
    comments: Comment[]
}

const Posts: React.FC<IPostProps> = ({ post, exist, postId, comments }) => {

    if (!exist)
        return <Error statusCode={404} title='Post Not Found' withDarkMode={false} />

    return <PostBody {...{ post, comments }} isDraft={true} />

}

export default Posts

// implementing getServerSideProps for server side fetching posts
export const getServerSideProps: GetServerSideProps = async (context) => {



    const { postId } = context.query as unknown as IPostQuery;
    let comments: Comment[] = [];

    //   fetching data


    try {
        const dbRef = ref(database);
        const postSnapshot = await get(child(dbRef, `/drafts/${postId}`));
        const commentSnapshot = await get(child(dbRef, `/comments/${postId}`));

        if (postSnapshot.exists()) {

            // getting comments
            const post = postSnapshot.val() as IPost;
            if (commentSnapshot.exists()) {
                const commentsData = commentSnapshot.val() as ICommentsData;
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
import { database } from '@/config/firebase'
import { ProfileContext } from '@/context'
import { IPost } from '@/types'
import { Editor } from '@tinymce/tinymce-react'
import { child, get, ref, set,remove } from 'firebase/database'
import { GetServerSideProps } from 'next'
import Error from 'next/error'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useRef } from 'react'
import { Editor as TinyMCEEditor } from 'tinymce'
import { toast } from 'react-toastify';
 


interface IEditPostProps {
    post: IPost;
    exist: boolean;
    postId: string;
    comments: Comment[]
}

const Edit: React.FC<IEditPostProps> = ({ post, exist, postId }) => {

    if (!exist)
        return <Error statusCode={404} title='Post Not Found' withDarkMode={false} />

    const editorRef = useRef<TinyMCEEditor | null>(null);

    const profileData = useContext(ProfileContext);

    const router = useRouter();
    const publish = () => {
        if (editorRef.current) {
            set(ref(database, `/publish/${post.id}`), {
                ...post,
                content: editorRef.current.getContent()
            }).then(() => {
                editorRef.current?.setContent('');
                editorRef.current?.setDirty(false);
                editorRef.current?.save();
                toast.info('Published Successfully');
                remove(ref(database,`/drafts/${postId}`))
                    .then(() => {
                    })
                    .catch((error) => {
                        console.error("Error deleting node:", error);
                    });
                router.push('/' + profileData.userId + '/published');
            }).catch(error => {
                console.error(error);
                toast.error("Error while Publishing")
            })
        };
    }


    const draft = () => {
        if (editorRef.current) {
            set(ref(database, `/drafts/${post.id}`), {
                ...post,
                content: editorRef.current.getContent()
            }).then(() => {
                editorRef.current?.setContent('');
                editorRef.current?.setDirty(false);
                editorRef.current?.save();
                toast.info('Drafted Successfully');
                router.push('/' + profileData.userId + '/draft');
            }).catch((err) => {
                console.error(err);
                toast.error("Error while drafting")
            });
        };
    }


    return (
        <div>
            <Head>
                <title>{post.title} | WordCraft</title>
            </Head>
            <section className='m-1 my-10 md:mx-16'>
                <div className='flex justify-end'>
                    <button className='bg-accent text-primary  px-3 py-1 rounded-lg duration-200 hover:bg-primary hover:text-accent ease-in m-3 font-nunito' onClick={() => draft()}>Draft</button>
                    <button className='bg-primary text-accent  px-3 py-1 rounded-lg duration-200 hover:bg-accent hover:text-primary ease-in m-3 font-nunito' onClick={() => publish()}>Publish</button>
                </div>
                <h1 className='text-3xl my-3 text-center md:text-5xl font-nunito'>{post.title}</h1>
                {post.image !== "" && <Image
                    src={post.image}
                    alt="Unable to load Image"
                    width={700}
                    height={500}
                    className='rounded-md m-5 mx-auto'
                />}
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={post.content}
                    init={{
                        branding: false,
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'autosave', 'imagetools'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help' + ' code image ',
                        content_style: 'body { font-family:serif Helvetica,Arial,sans-serif; font-size:14px }',
                    }}
                />
            </section>
        </div>
    )
}

export default Edit;

// fetching post data from firebase database using getServerSideProps

export const getServerSideProps: GetServerSideProps = async (context) => {
    const postId = context.query.postId as string;
    const data = await getPost(postId);
    return {
        props: {
            ...data
        }
    }
}

async function getPost(postId: string) {
    // fetching data
    try {
        const dbRef = ref(database);
        const postSnapshot = await get(child(dbRef, `/drafts/${postId}`));
        if (postSnapshot.exists()) {
            const post = postSnapshot.val() as IPost;
            return {
                post,
                exist: true,
                postId
            };
        }
    } catch (error) {
        console.error(error);
    }
    return {
        post: {},
        exist: false,
        postId
    }
}
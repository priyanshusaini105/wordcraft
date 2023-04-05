import { Comment, IPost } from "@/types";
import { FaUserCircle, FaRegCalendarAlt } from "react-icons/fa";
import CommentSection from "./CommentSection";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Head from "next/head";
import { BsLink45Deg } from "react-icons/bs";
import { useCopyToClipboard } from "@/hooks";
import Dropdown from "./Dropdown";
import { ProfileContext } from "@/context";
import { useContext } from "react";

export default function PostBody({ post,  comments,isDraft }: { post: IPost, comments: Comment[] ,isDraft:boolean}): React.ReactElement<any, any> | null {

    const [copied, copyToClipboard] = useCopyToClipboard();
    const {role,userId}=useContext(ProfileContext);

    const postId=post.id;
    
    return (
        <article className='container flex gap-5 pt-5 md:pt-16 flex-col md:flex-row'>
            <Head>
                <title>{post.title ?? "Not Found"}</title>
            </Head>
            <section className='md:w-8/12 border-r px-3 md:px-16'>
                {/* title */}
                {/* <hr /> */}
                <h1 className="text-4xl md:text-6xl font-semibold font-nunito m-2 text-black mb-8">{post.title}</h1>

                {/* header */}
                <div className='flex justify-between my-4 px-2'>
                    <div className='flex m-2 items-center gap-3'>
                        <FaUserCircle size={38} />
                        <span className=''>
                            <div className="flex">
                                <p className='text-md'>{post.author}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <FaRegCalendarAlt size={18} className='opacity-60' />
                                <p className='text-xs text-gray-600'>{post.updatedAt}</p>
                            </div>
                        </span>
                    </div>

                    <div className='flex m-2 items-center gap-5'>
                        <button title="Copy Link" onClick={() => copyToClipboard(window.location.href)}>
                            <BsLink45Deg size={25} className="text-gray-600 hover:text-black duration-100 ease-in" />
                        </button>
                        {(role==="admin"||userId===post.userId)&&<Dropdown isDraft={isDraft} post={post}/>}
                    </div>
                </div>

                <div className='flex justify-center my-4'>
                    <Image src={post.image} width={650} height={500} alt="Unable to load Image" className='m-6' />
                </div>
                <div className='  font-serif leading-7' dangerouslySetInnerHTML={{ __html: post.content }} />
                <section>
                    <CommentSection postId={postId} comments={comments} />
                </section>
            </section>
            <Sidebar posts={{}} blogPostTags={[]} />
        </ article>
    );
}
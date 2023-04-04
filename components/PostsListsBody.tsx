import { IPostsData } from "@/types";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Image from "next/image";

export default function PostsListsBody({posts, userId}:{posts: IPostsData, userId: string}) {
    return <div className='bg-accent p-5 mb-5 flex flex-col md:flex-row gap-5'>
        <section className=" w-3/5">
            <div className='ml-5'>
                <h1 className="text-white bg-primary p-1 text-center text-2xl max-w-fit font-nunito inline">Drafted</h1>
                <span className="mx-1 text-2xl font-nunito">Posts</span>
                <hr className='mt-1' />
            </div>
            <div className='flex justify-center'></div>
            <ul className=" w-full">
                {Object.keys(posts).map((key) => {
                    const { image, title, tags, content, id } = posts[key];
                    return (
                        <li key={key} className="bg-white rounded-lg m-5 flex gap-5 p-5 max-w-xl flex-col items-center md:flex-row">
                            <Image
                                src={image}
                                alt={title}
                                width={200}
                                height={50}
                                className='rounded-lg bg-white' />
                            <Link href={`/${userId}/draft/${id}`}>
                                <span className="bg-green-100 text-xs rounded-md p-1 text-gray-500">{tags[0]}</span>
                                <h2 className="font-semibold font-nunito">{title}</h2>
                                <hr />
                                <p className="text-sm m-2">{getExcerpt(content)}</p>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
        <Sidebar blogPostTags={[]} posts={posts} />
    </div>;
}

function getExcerpt(content: string): string {
    const maxLength = 200;
    const text = content.replace(/<[^>]*>?/gm, ''); // remove HTML tags
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}
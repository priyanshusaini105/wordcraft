import Head from 'next/head'
import { Hero, Sidebar } from '@/components'
import { GetServerSideProps } from 'next';
import { database } from '@/config/firebase';
import { IPostsData } from '@/types';
import { ref, query, orderByChild, get, limitToLast } from 'firebase/database';
import { RenderPosts } from '@/components';
import Image from 'next/image';
import Link from 'next/link';




export default function Home({ posts }: { posts: IPostsData }) {
  return (
    <>
      <Head>
        <title>WordCraft | Create & Connect</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='divide-y flex flex-col'>
        <Hero />
        <div id='read'>
        <RenderPosts posts={posts} />
        {/* showing all posts */}
          <div className='bg-accent p-5 mb-5 flex flex-col md:flex-row gap-5'>
            <section className="w-full md:w-3/5">
              <div className='ml-5'>
                <h1 className="text-white bg-primary p-1 text-center text-2xl max-w-fit font-nunito inline">Published</h1>
                <span className="mx-1 text-2xl font-nunito">Posts</span>
                <hr className='mt-1' />
              </div>
              <div className='flex justify-center'></div>
              <ul className=" w-full">
                {Object.keys(posts).map((key) => {
                  const { image, title, tags, content, id,userId } = posts[key]
                  return (
                    <li key={key} className="bg-white rounded-lg m-5 flex gap-5 p-5 max-w-xl flex-col items-center md:flex-row">
                      <Image
                        src={image}
                        alt={title}
                        width={200}
                        height={50}
                        className='rounded-lg bg-white'
                      />
                      <Link href={`/${userId}/${id}`}>
                        <span className="bg-primary/20 text-xs rounded-md p-1 text-gray-500">{tags[0]}</span>
                        <h2 className="font-semibold font-nunito my-2">{title}</h2>
                        <hr />
                        <p className="text-sm m-2   font-serif leading-7">{getExcerpt(content)}</p>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
            <Sidebar blogPostTags={[]} posts={posts} />
          </div>
        </div>
      </div>
    </>
  )
};


// implementing getServerSideProps for server side fetching posts
export const getServerSideProps: GetServerSideProps = async (context) => {

  //   fetching data
  try {
    const postsRef = ref(database, 'publish');
    const postsQuery = query(postsRef, orderByChild('createdAt'), limitToLast(5));
    const snapshot = await get(postsQuery);
    if (snapshot.exists()) {
      const posts = snapshot.val() as IPostsData;
      return {
        props: {
          posts
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
      posts: {}
    }
  }
}


function getExcerpt(content: string): string {
  const maxLength = 200;
  const text = content.replace(/<[^>]*>?/gm, ''); // remove HTML tags
  if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
  }
  return text;
}

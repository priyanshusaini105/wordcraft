import { Sidebar } from '@/components';
import { database } from '@/config/firebase';
import { ProfileContext } from '@/context'
import { IPostsData } from '@/types';
import { ref, child, get } from 'firebase/database';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'


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

const Drafts = () => {
  const { userId } = useContext(ProfileContext);
  const [posts, setPosts] = useState<IPostsData>({});

  // useEffect(() => {
  const fetchPosts = async () => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, `/users/${userId}/draft`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setPosts(data as IPostsData);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchPosts();
  // }, []);

  return (
    <div className='bg-accent p-5 mb-5 flex flex-col md:flex-row gap-5'>
      <section className=" w-3/5">
        <div className='ml-5'>
        <h1 className="text-white bg-primary p-1 text-center text-2xl max-w-fit font-nunito inline">Drafted</h1>
        <span className="mx-1 text-2xl font-nunito">Posts</span>
        <hr className='mt-1'/>
        </div>
        <div className='flex justify-center'></div>
        <ul className=" w-full">
          {Object.keys(posts).map((key) => {
            const { image, title, tags, content, id } = posts[key]
            return (
              <li key={key} className="bg-white rounded-lg m-5 flex gap-5 p-5 max-w-xl flex-col items-center md:flex-row">
                <Image
                  src={image}
                  alt={title}
                  width={200}
                  height={50}
                  className='rounded-lg bg-white'
                />
                <Link href={`/${userId}/draft/${id}`}>
                  <span className="bg-green-100 text-xs rounded-md p-1 text-gray-500">{tags[0]}</span>
                  <h2 className="font-semibold font-nunito">{title}</h2>
                  <hr />
                  <p className="text-sm m-2">{getExcerpt(content)}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
      <Sidebar blogPostTags={blogPostTags} posts={posts} />
    </div>
  )
}

export default Drafts;


function getExcerpt(content: string): string {
  const maxLength = 200;
  const text = content.replace(/<[^>]*>?/gm, ''); // remove HTML tags
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

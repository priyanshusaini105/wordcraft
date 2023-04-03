import React, { useContext, useEffect} from 'react'
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import Image from 'next/image';
import { CreateBlogPostForm } from '@/components';
import { ICreatePostFormData } from '@/types';
import { uid } from 'uid';
import { ProfileContext } from '@/context';



const Write = () => {

  const router = useRouter();

  const {login}=useContext(ProfileContext);

  // redirect if user already exist
  useEffect(() => {
    if(!login)
      router.push('/login')
  }, [])

  const getFormData = (data: ICreatePostFormData) => {
    console.log(data);
    const id = uid();
    const dataString = JSON.stringify({...data,id});
    const encodedData = encodeURIComponent(dataString);
    router.push(`/write/${encodedData}`);
  };
  


  return (
    <section className='bg-accent flex md:justify-around flex-col-reverse md:flex-row gap-3 p-8'>
      <CreateBlogPostForm getFormData={getFormData}/>
      <Image src="/img/createPost.svg" alt='Create Post' width={600} height={400} />
    </section>
  )
}

export default Write
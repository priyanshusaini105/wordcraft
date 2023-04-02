import React, { useEffect} from 'react'
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import Image from 'next/image';
import { CreateBlogPostForm } from '@/components';
import { ICreatePostFormData } from '@/types';
import { uid } from 'uid';



const Write = () => {

  const router = useRouter();

  // redirect if user already exist
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, function (user) {
      if (!user)
        router.push('/login')
    });
    return unsubscribe;
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
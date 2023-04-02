import { ICreatePostFormData } from '@/types';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
interface IPostInitialData extends ICreatePostFormData {
  id: string;
}
const Write = () => {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, function (user) {
      if (!user)
        router.push('/login')
      else
        setId(user.uid)
    });
    return unsubscribe;
  }, [])

  

  const router = useRouter();
  const data = JSON.parse(typeof router.query.write === 'undefined' ? '{}' : router.query.write as string) as IPostInitialData;

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };



  return (
    <div>
      <Head>
        <title>{data.title} | WordCraft</title>
      </Head>
      <section className='m-1 my-10 md:mx-16'>
        <div className='flex justify-end'>
          <button className='bg-accent text-primary  px-3 py-1 rounded-lg duration-200 hover:bg-primary hover:text-accent ease-in m-3 font-nunito'>Draft</button>
          <button className='bg-primary text-accent  px-3 py-1 rounded-lg duration-200 hover:bg-accent hover:text-primary ease-in m-3 font-nunito'>Publish</button>
        </div>
        <h1 className='text-3xl my-3 text-center md:text-5xl font-nunito'>{data.title}</h1>
        {data.image !== "" && <Image
          src={data.image}
          alt="Unable to load Image"
          width={700}
          height={500}
          className='rounded-md m-5 mx-auto'
        />}
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          onInit={(evt, editor) => editorRef.current = editor}
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
              'removeformat | help' + ' code image fontfamily',
            autosave_retention: '30m',
            font_family_formats: 'Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n;Nunito=nunito; Poppins=poppins',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </section>
    </div>
  )
}

export default Write
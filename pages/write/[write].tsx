import { ICreatePostFormData, IPost } from '@/types';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef } from 'react'
import Image from 'next/image';
import { database } from '@/config/firebase';
import { ref, set } from 'firebase/database';
import { ProfileContext } from '@/context';

interface IPostInitialData extends ICreatePostFormData {
  id: string;
}


const Write = () => {
  const router = useRouter();
  const data = JSON.parse(typeof router.query.write === 'undefined' ? '{}' : router.query.write as string) as IPostInitialData;

  const profileData = useContext(ProfileContext);




  const editorRef = useRef<TinyMCEEditor | null>(null);

  const publish = async () => {
    if (editorRef.current) {
      const date = new Date().toLocaleDateString('en-US').replace(/\//g, '-');
      const postData: IPost = {
        ...data,
        userId: profileData.userId,
        content: editorRef.current.getContent(),
        createdAt: date,
        updatedAt: date,
        author: profileData.name,
      };
      try {
        await set(ref(database, `/publish/${data.id}`), postData);
        editorRef.current?.setContent("");
        editorRef.current?.setDirty(false);
        editorRef.current?.save();
        alert("Published Successfully");
        router.push("/" + profileData.userId + "/published");
      } catch (error) {
        console.error(error);
        alert("Error while Publishing");
      }
    }
  };
  
  const draft = () => {
    if (editorRef.current) {
      set(ref(database, `/drafts/${data.id}`), {
        ...data,
        content: editorRef.current.getContent()
      }).then(() => {
        editorRef.current?.setContent('');
        editorRef.current?.setDirty(false);
        editorRef.current?.save();
        alert('Drafted Successfully');
        router.push('/' + profileData.userId + '/draft');
      }).catch((err) => {
        console.error(err);
        alert("Error while drafting")
      });
    };
  }

useEffect(() => {
  
}, [])


  return (
    <div>
      <Head>
        <title>{data.title} | WordCraft</title>
      </Head>
      <section className='m-1 my-10 md:mx-16'>
        <div className='flex justify-end'>
          <button className='bg-accent text-primary  px-3 py-1 rounded-lg duration-200 hover:bg-primary hover:text-accent ease-in m-3 font-nunito' onClick={() => draft()}>Draft</button>
          <button className='bg-primary text-accent  px-3 py-1 rounded-lg duration-200 hover:bg-accent hover:text-primary ease-in m-3 font-nunito' onClick={() => publish()}>Publish</button>
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

export default Write;

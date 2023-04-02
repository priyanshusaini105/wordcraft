import { ICreatePostFormData } from '@/types';
import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';

const CreateBlogPostForm = ({ getFormData }: { getFormData: (data: ICreatePostFormData) => void }) => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
  
    const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && tagInput.trim() !== "") {
        const newTag = tagInput.trim();
        if (!tags.includes(newTag)) {
          setTags((prevTags) => [...prevTags, newTag]);
        }
        setTagInput("");
      }
    };
  
    const handleTagDelete = (tag: string) => {
      setTags((prevTags) => prevTags.filter((t) => t !== tag));
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData: ICreatePostFormData = {
        title,
        image,
        tags,
      };
      getFormData(formData);
    };  

    return (
        <div className="max-w-lg  bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 font-nunito">Create a New Blog Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title" type="text" placeholder="Enter your post title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        className="shadow-inner appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image" type="url" placeholder="Enter the URL of your post image" value={image} onChange={(e) => setImage(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="tags">
                        Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <div key={tag} className="bg-blue-100 rounded-lg px-2 py-1 flex items-center gap-2">
                                <span>{tag}</span>
                                <button type="button" onClick={() => handleTagDelete(tag)}>
                                    <RxCross2 />
                                </button>
                            </div>
                        ))}
                        <div className="flex items-center">
                            <input
                                className="shadow-inner appearance-none border rounded w-full py-2 px text-gray-700 leading-tight focus:outline-none focus:shadow-outlin p-1"
                                id="tags" type="text" placeholder="Enter a tag and press Enter" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagInputKeyDown} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        className="bg-primary hover:bg-accent hover:text-primary ease-in duration-150 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Create Post
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateBlogPostForm
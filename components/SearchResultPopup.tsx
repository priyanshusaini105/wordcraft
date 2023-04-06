import { useState, useEffect } from 'react';
import { IPost } from '@/types';
import Link from 'next/link';
import { FiX } from 'react-icons/fi';

interface Props {
    filteredPosts: IPost[];
    onClose: () => void;
}

function SearchPopup({ filteredPosts, onClose }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(Boolean(filteredPosts.length));
    }, [filteredPosts]);

    function handleBackgroundClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-gray-500 bg-opacity-50 ${isOpen ? '' : 'hidden'}`} onClick={handleBackgroundClick}>
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md sm:mx-auto mt-10 mx-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Search Results:</h2>
                    <button className="text-gray-600 hover:text-gray-800 transition duration-300" onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                {filteredPosts.length ? (
                    <ul className="mt-4 divide-y divide-gray-200">
                        {filteredPosts.map((post) => (
                            <li key={post.id} className="py-4">
                                <Link href={`/${post.userId}/${post.id}`} className="block text-gray-800 hover:text-blue-500 font-medium transition duration-300">
                                    {post.title}
                                </Link>
                                <p className="text-gray-600 mt-2 leading-relaxed text-xs">{getExcerpt(post.content)}...</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 py-4">No results found.</p>
                )}

                <button className="mt-4 bg-primary hover:bg-green-900 text-white py-2 px-4 rounded-lg" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default SearchPopup;

function getExcerpt(content: string): string {
    const maxLength = 30;
    const text = content.replace(/<[^>]*>?/gm, ''); // remove HTML tags
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}
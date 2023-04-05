import { database } from '@/config/firebase'
import { ref, remove, set } from 'firebase/database'
import { useState, useRef, useEffect } from 'react'
import { FiMoreHorizontal, FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { Zoom, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/router';
import { IPost } from '@/types'

export default function Dropdown({ isDraft, post }: { isDraft: boolean, post: IPost }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }


    const  postId  = post.id;


    // delete post
    const deletePost = (isEdit:boolean) => {
        const postRef = ref(database, isDraft ? `/drafts/${postId}` : `/publish/${postId}`);
        remove(postRef)
            .then(() => {
                toast('Post Deleted Successfully', { type: 'success', transition: Zoom, position: "top-center", });
                if(!isEdit)
                    router.push('/' + post.userId)
            })
            .catch((error) => {
                console.error("Error deleting node:", error);
                toast('Error Deleting Post', { type: 'error', transition: Zoom, position: "top-center", })
            });
    }

    // handle post edit move post to draft
    const handlePostEdit = () => {
        if (!isDraft) {
            set(ref(database, `/drafts/${postId}`), post)
                .then(() => {
                    deletePost(true);
                    router.push(`/edit/${postId}`);
                }).catch((err) => {
                    console.error(err);
                    alert("Error while drafting")
                });
        }
        router.push(`/edit/${postId}`);
    }


    // handle post delete
    const handleDelete = () => {
        if (confirm("Do You Really want to delete The Post"))
            deletePost(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="focus:outline-none"
                title="More">
                <FiMoreHorizontal size={25} className="text-gray-600 hover:text-black duration-100 ease-in" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border-gray-300 border z-10">
                    <button
                        onClick={handlePostEdit}
                        className="py-2 px-4 text-gray-700 w-full text-left rounded-md text-sm hover:bg-gray-100 flex gap-2 items-center"
                    >
                        <FiEdit size={23} />
                        Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="py-2 px-4 text-error w-full text-left hover:bg-gray-100 rounded-md text-sm flex items-center gap-2"
                    >
                        <MdDeleteOutline className="text-error" size={25} />
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

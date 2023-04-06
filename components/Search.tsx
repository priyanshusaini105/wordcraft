import { useState, useRef, useMemo } from 'react';
import { BsSearch } from 'react-icons/bs';
import { ref, get, orderByKey } from 'firebase/database';
import { database } from '@/config/firebase';
import { IPost } from '@/types';
import SearchPopup from './SearchResultPopup';
import { toast } from 'react-toastify';



function Search() {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);
    const [isFetching, setIsFetching] = useState(false); // added state variable

    const inputRef = useRef<HTMLInputElement>(null);


    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }

    function handleInputFocus() {
        setIsExpanded(true);
    }

    function handleInputBlur() {
        setIsExpanded(Boolean(query));
    }

    async function searchPosts(query: string): Promise<IPost[]> {
        // Create a reference to the 'publish' node
        const publishRef = ref(database, 'publish');
        // Create a query that orders the results by key (postId)

        try {
            setIsFetching(true);
            // Retrieve the posts data
            const snapshot = await get(publishRef);


            // Convert the data into an array of posts
            const posts: IPost[] = [];
            snapshot.forEach((childSnapshot) => {
                const post = childSnapshot.val() as IPost;
                posts.push(post);
            });

            // Filter the posts based on the search query
            const filteredPosts = posts.filter((post) =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );

            return filteredPosts;
        } catch (error) {
            console.error('Error searching for posts:', error);
            return [];
        }
    }

    function handleSubmit() {
        if (isFetching||!query.trim()) return;
        
        toast.promise(
            searchPosts(query).then((posts) => {
                setFilteredPosts(posts)
                setIsFetching(false);
            })
            ,
            {
            pending: 'Searching posts...',
                success: 'Posts Found!',
                error: 'Error searching for posts',
        },
        {
            autoClose: 1000,
            hideProgressBar: true,
        }
        )
    }

    const inputClassName = useMemo(() => {
        return `outline-none bg-accent ${isExpanded ? 'w-auto' : 'w-0'} transition-width duration-300 ease-in-out md:w-full md:p-1`;
    }, [isExpanded]);

    return (
        <div className="relative">
            <label className="flex items-center p-1 bg-accent shadow-inner px-2 rounded-lg gap-2">
                <input
                    type="text"
                    className={inputClassName}
                    placeholder="Search posts..."
                    value={query}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    ref={inputRef}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <BsSearch onClick={()=>query ? handleSubmit() : undefined} className="cursor-pointer" />
            </label>
            <SearchPopup filteredPosts={filteredPosts} onClose={()=>setFilteredPosts([])}/>
        </div>

    );
}

export default Search;

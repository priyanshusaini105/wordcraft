import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { IoMdSend } from 'react-icons/io';
import { ProfileContext } from '@/context';
import Link from 'next/link';
import { Comment } from '@/types';
import { uid } from 'uid';
import { ref, set } from 'firebase/database';
import { database } from '@/config/firebase';



interface CommentSectionProps {
  postId: string;
  comments:Comment[];
}



const CommentSection: React.FC<CommentSectionProps> = ({ postId,comments:commentsData }) => {


  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [newComment, setNewComment] = useState<string>('');
  const { name } = useContext(ProfileContext);

// set comment to db
const setCommentToDB= async (commentId:string,comment:Comment)=> {
   await set(ref(database, `comments/${postId}/${commentId}`),comment);
}


// manages comments 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
       const comment={ user: name, comment: newComment.trim() }
      setComments([...comments,comment]);
      setNewComment('');
      const commentId=uid(10);
      setCommentToDB(commentId,comment)
    }
  };

  return (
    <div className="bg-accent my-8 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <ul className="divide-y divide-white">
        {comments.map((comment, index) => (
          <li key={index} className="py-4">
            <div className="flex items-center">
              <div className="mr-4">
                <FiUser className="text-gray-600 w-8 h-8" />
              </div>
              <div>
                <p className="text-gray-800 font-medium text-lg">{comment.user}</p>
                <p className="text-gray-800">{comment.comment}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {name ? (
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex flex-col mb-4">
            <label htmlFor="comment" className="text-gray-700 font-bold mb-2 text-lg">
              Leave a comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-primary"
              placeholder="Write your comment here..."
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            <IoMdSend className="mr-2" size={23}/>
            <span className="text-lg font-nunito">Submit</span>
          </button>
        </form>
      ) : (
        <p className="mt-8 text-lg font-medium">
          Please <Link href="/login" className="text-indigo-500 hover:underline">log in</Link> to leave a comment. <br /> We appreciate your thoughts!
        </p>
      )}
    </div>
  );
};

export default CommentSection;

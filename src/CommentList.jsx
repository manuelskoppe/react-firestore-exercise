import React, { useState, useEffect } from 'react';
import { getCommentsOfSong, deleteCommentFromSong } from './firestoreService';
import ReplyForm from './ReplyForm';
import ReplyList from './ReplyList';

const CommentList = ({ songId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const fetchedComments = await getCommentsOfSong(songId);
    setComments(fetchedComments);
  };

  useEffect(() => {
    fetchComments();
  }, [songId, onCommentAdded]); // Dependiendo de songId y onCommentAdded para recargar comentarios

  const handleDeleteComment = async (commentId) => {
    await deleteCommentFromSong(songId, commentId);
    fetchComments(); // Recargar comentarios después de borrar uno
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Comentarios</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className="mb-6 p-4 bg-white rounded shadow">
            <p className="mb-2">
              {comment.text} - <span className="text-gray-600">{comment.author}</span>
            </p>
            <ReplyList commentId={comment.id} songId={songId} />
            <ReplyForm commentId={comment.id} songId={songId} />
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;




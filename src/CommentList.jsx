import React, { useState, useEffect } from 'react';
import { getCommentsOfSong, deleteCommentFromSong, addLikeToComment } from './firestoreService';
import ReplyForm from './ReplyForm';
import ReplyList from './ReplyList';

const CommentList = ({ songId, onCommentAdded }) => {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const fetchedComments = await getCommentsOfSong(songId);
    setComments(fetchedComments); // Asume que fetchedComments ya incluye el conteo de "me gusta"
  };

  useEffect(() => {
    fetchComments();
  }, [songId, onCommentAdded]); // Dependiendo de songId y onCommentAdded para recargar comentarios

  const handleDeleteComment = async (commentId) => {
    await deleteCommentFromSong(songId, commentId);
    fetchComments(); // Recargar comentarios después de borrar uno
  };

  const handleLike = async (commentId) => {
    try {
      await addLikeToComment(songId, commentId);
      fetchComments(); // Recargar los comentarios para reflejar el cambio de "me gusta"
    } catch (error) {
      console.error("Error al añadir me gusta: ", error);
    }
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
            <div className="flex items-center">
              <button
                onClick={() => handleLike(comment.id)}
                className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300"
              >
                Me gusta
              </button>
              <span>{comment.likeCount || 0} me gusta</span>
            </div>
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

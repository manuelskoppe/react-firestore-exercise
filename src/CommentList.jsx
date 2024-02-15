import React, { useState, useEffect } from 'react';
import { getCommentsOfSong, deleteCommentFromSong } from './firestoreService';
import ReplyForm from './ReplyForm'; // Asegúrate de que el componente está correctamente importado
import ReplyList from './ReplyList'; // Asegúrate de que el componente está correctamente importado

const CommentList = ({ songId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getCommentsOfSong(songId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [songId]);

  const handleDeleteComment = async (commentId) => {
    await deleteCommentFromSong(songId, commentId);
    // Actualizar la lista de comentarios después de borrar uno
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      <h3>Comentarios</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <p>{comment.text} - {comment.author}</p> {/* Asegúrate de que 'author' sea un campo en tu documento de comentarios */}
            {/* Aquí integrarás ReplyList para mostrar las respuestas existentes */}
            <ReplyList commentId={comment.id} songId={songId} />
            {/* Aquí integrarás ReplyForm para responder a un comentario */}
            <ReplyForm commentId={comment.id} songId={songId} />
            <button onClick={() => handleDeleteComment(comment.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

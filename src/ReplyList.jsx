import React, { useState, useEffect } from 'react';
import { getRepliesOfComment, deleteReplyFromComment } from './firestoreService';

const ReplyList = ({ songId, commentId }) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchReplies = async () => {
      const fetchedReplies = await getRepliesOfComment(songId, commentId);
      setReplies(fetchedReplies);
    };

    fetchReplies();
  }, [songId, commentId]);

  const handleDeleteReply = async (replyId) => {
    await deleteReplyFromComment(songId, commentId, replyId);
    // Actualizar la lista de respuestas después de borrar una
    setReplies(replies.filter(reply => reply.id !== replyId));
  };

  return (
    <ul>
      {replies.map(reply => (
        <li key={reply.id}>
          {reply.text} - {reply.author} {/* Asegúrate de que 'author' y 'text' sean campos en tu documento de respuestas */}
          {reply.imageUrl && (
            <img src={reply.imageUrl} alt="Imagen de la respuesta" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          )}
          <button onClick={() => handleDeleteReply(reply.id)}>Borrar</button>
        </li>
      ))}
    </ul>
  );
};

export default ReplyList;

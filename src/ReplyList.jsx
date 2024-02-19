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
    setReplies(replies.filter(reply => reply.id !== replyId));
  };

  return (
    <div className="ml-8 border-l-2 border-gray-200 pl-4"> {/* Añade margen e indentación a las respuestas */}
      <ul>
        {replies.map(reply => (
          <li key={reply.id} className="mt-2">
            <div className="flex items-start space-x-2">
              <p className="flex-1 text-sm">{reply.text} - <span className="text-gray-500">{reply.author}</span></p>
              {reply.imageUrl && (
                <img src={reply.imageUrl} alt="Imagen de la respuesta" className="max-w-xs max-h-24" />
              )}
              <button
                onClick={() => handleDeleteReply(reply.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplyList;

//addcomentform.jsx

import React, { useState } from 'react';
import { addCommentToSong } from './firestoreService';

const AddCommentForm = ({ songId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;
    
    try {
      await addCommentToSong(songId, { text: commentText });
      setCommentText(''); // Limpiar el formulario
      if (onCommentAdded) {
        onCommentAdded(); // Llama al callback para indicar que se ha añadido un nuevo comentario
      }
    } catch (error) {
      console.error("Error adding comment: ", error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Escribe un comentario..."
        className="px-4 py-2 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Comentar
      </button>
    </form>
  );
};

export default AddCommentForm;

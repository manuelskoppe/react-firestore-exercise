// AddCommentForm.jsx
import React, { useState } from 'react';
import { addCommentToSong } from './firestoreService';

const AddCommentForm = ({ songId }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;
    await addCommentToSong(songId, { text: commentText });
    setCommentText(''); // Limpiar el formulario
    // Aquí podrías querer actualizar la lista de comentarios
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button type="submit">Comentar</button>
    </form>
  );
};

export default AddCommentForm;

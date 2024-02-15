import React, { useState } from 'react';
import { addReplyToComment } from './firestoreService';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importa desde Firebase SDK
import { storage } from './firebase'; // Asegúrate de que esta importación esté correctamente configurada

const ReplyForm = ({ songId, commentId }) => {
  const [replyText, setReplyText] = useState('');
  const [image, setImage] = useState(null); // Estado para manejar la imagen

  const handleReplySubmit = async (event) => {
    event.preventDefault();
    if (!replyText.trim() && !image) return;

    let imageUrl = '';
    if (image) {
      const imageRef = ref(storage, `replies/${image.name}-${Date.now()}`);
      const snapshot = await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    try {
      // Llamar a la función de servicio para añadir una respuesta con texto e imagen (si existe)
      await addReplyToComment(songId, commentId, { text: replyText, imageUrl });
      setReplyText(''); // Limpiar el campo de texto después de enviar
      setImage(null); // Limpiar el estado de la imagen después de enviar
    } catch (error) {
      console.error("Error al añadir respuesta: ", error);
    }
  };

  return (
    <form onSubmit={handleReplySubmit}>
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Escribe una respuesta..."
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])} // Maneja el archivo seleccionado
      />
      <button type="submit">Responder</button>
    </form>
  );
};

export default ReplyForm;

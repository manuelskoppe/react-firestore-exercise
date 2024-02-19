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
    <form onSubmit={handleReplySubmit} className="flex flex-col gap-2 my-2">
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Escribe una respuesta..."
        className="px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="file:px-4 file:py-2 file:border file:border-gray-300 file:rounded file:text-sm file:font-semibold file:bg-white file:text-blue-700 hover:file:bg-blue-50"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Responder
      </button>
    </form>
  );
};

export default ReplyForm;

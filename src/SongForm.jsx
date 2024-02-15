import React, { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './SongForm.css';

const addSong = async (title, artist, year, genre, content, imageFile) => { // Añade el parámetro 'content' aquí
  console.log("Iniciando la subida de la canción y la imagen...");
  try {
    console.log("Subiendo imagen:", imageFile.name);
    const imageRef = ref(storage, `images/${imageFile.name}`);
    const snapshot = await uploadBytes(imageRef, imageFile);
    console.log("Imagen subida. Obteniendo URL...");
    const imageUrl = await getDownloadURL(snapshot.ref);

    console.log("Creando documento en Firestore con la URL de la imagen y contenido...");
    const docRef = await addDoc(collection(db, "songs"), {
      title: title,
      artist: artist,
      year: year,
      genre: genre,
      content: content, // Asegúrate de incluir 'content' aquí
      imageUrl: imageUrl,
    });
    console.log("Documento escrito con ID: ", docRef.id);
    return docRef.id; // Devolver el ID del documento podría ser útil
  } catch (e) {
    console.error("Error al añadir documento o subir imagen: ", e);
  }
};


function SongForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Formulario enviado. Datos:", { title, artist, year, genre, content, image });
  
    if (!image) {
      console.error('Error: No se seleccionó ninguna imagen.');
      alert('Por favor, selecciona una imagen para el post.');
      return;
    }
  
    // Incluye 'content' cuando llames a 'addSong'
    addSong(title, artist, parseInt(year), genre, content, image).then((docId) => {
      console.log("Canción añadida con ID:", docId);
      // Restablece los campos del formulario y el estado de la imagen aquí
      setTitle('');
      setArtist('');
      setYear('');
      setGenre('');
      setContent(''); // Restablece también el estado de 'content'
      setImage(null); // Restablece el estado de la imagen
    }).catch((error) => {
      console.error('Error al añadir la canción:', error);
    });
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900">Crear Nuevo Post</h2>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 block">Título del Post</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Introduce el título aquí"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Autor</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Nombre del autor"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Año</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Año de publicación"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Género</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Género del post"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Contenido del Post</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe el contenido aquí"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Imagen</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded mt-1 file:bg-blue-50 file:border-none file:p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-blue-500"
          >
            Añadir Post
          </button>
        </form>
      </div>
    </div>
  );
  
  
};
export default SongForm;

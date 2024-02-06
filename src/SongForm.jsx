import React, { useState } from "react";
import { db } from "./firebase"; // Importación nombrada
import { collection, addDoc } from "firebase/firestore";



const addSong = async (title, artist, year, genre) => {
    try {
      const docRef = await addDoc(collection(db, "songs"), {
        title: title,
        artist: artist,
        year: year,
        genre: genre
      });
      console.log("Documento escrito con ID: ", docRef.id);
    } catch (e) {
      console.error("Error al añadir documento: ", e);
    }
  };
  



function SongForm() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí llamarías a la función addSong con los valores del formulario
    addSong(title, artist, parseInt(year), genre).then(() => {
      // Restablece los campos del formulario o maneja el estado de la presentación
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la canción"
        required
      />
      <input
        type="text"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        placeholder="Artista"
        required
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Año"
        required
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Género"
        required
      />
      <button type="submit">Añadir Canción</button>
    </form>
  );
}

export default SongForm;

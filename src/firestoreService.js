// Importaciones necesarias de Firebase
import { db, storage } from './firebase'; // Asegúrate de exportar 'storage' desde tu archivo de configuración de Firebase
import {
  collection,
  query,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { increment } from 'firebase/firestore';


// Funciones existentes (ejemplos previos)...

// Nueva función para subir imágenes a Firebase Storage
export const uploadImage = async (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen: ", error);
    return null;
  }
};

// Función para añadir un nuevo post con imagen y contenido
export const addPostWithImageAndContent = async (postData, imageUrl, content) => {
  console.log('postData:', postData);
  console.log('imageUrl:', imageUrl);
  console.log('content:', content); // Asegúrate de que esto muestre el contenido esperado

  const postsRef = collection(db, 'posts');
  try {
    const docRef = await addDoc(postsRef, {
      ...postData,
      imageUrl: imageUrl,
      content: content, // Añade el contenido del post aquí
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error al crear el post: ", error);
    return null;
  }
};



// Función para actualizar un post existente con una nueva imagen y contenido
export const updatePostWithImageAndContent = async (postId, postData, imageUrl, content) => {
  const postRef = doc(db, 'posts', postId);
  try {
    await updateDoc(postRef, {
      ...postData,
      imageUrl: imageUrl,
      content: content, // Añade o actualiza el contenido del post aquí
    });
  } catch (error) {
    console.error("Error al actualizar el post: ", error);
  }
};

// Función para obtener y ordenar canciones por año
export const getSongs = async () => {
  const songsRef = collection(db, 'songs');
  const q = query(songsRef, orderBy('year'));

  try {
    const querySnapshot = await getDocs(q);
    const songs = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data()); // Log to see if 'author' is part of the document data
      songs.push({ id: doc.id, ...doc.data() });
    });
    return songs;
  } catch (error) {
    console.error("Error al obtener documentos: ", error);
    return []; // Devuelve un array vacío en caso de error
  }
};
// Función para borrar una canción por id
export const deleteSong = async (songId) => {
  try {
    await deleteDoc(doc(db, 'songs', songId));
    console.log("Canción borrada con éxito");
  } catch (error) {
    console.error("Error al borrar la canción: ", error);
  }
};

// Añadir un comentario a un post específico
export const addCommentToSong = async (songId, commentData) => {
  const commentsRef = collection(db, 'songs', songId, 'comments');
  try {
    await addDoc(commentsRef, {
      ...commentData,
      createdAt: serverTimestamp() // Utiliza el timestamp del servidor
    });
  } catch (error) {
    console.error("Error al añadir comentario: ", error);
  }
};

// Obtener comentarios de un post específico
export const getCommentsOfSong = async (songId) => {
  const commentsRef = collection(db, 'songs', songId, 'comments');
  const q = query(commentsRef, orderBy('createdAt', 'desc'));
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener comentarios: ", error);
    return [];
  }
};

// Borrar un comentario específico de un post
export const deleteCommentFromSong = async (songId, commentId) => {
  try {
    const commentRef = doc(db, 'songs', songId, 'comments', commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error("Error al borrar comentario: ", error);
  }
};

// Añadir una respuesta a un comentario específico
export const addReplyToComment = async (songId, commentId, replyData) => {
  const repliesRef = collection(db, 'songs', songId, 'comments', commentId, 'replies');
  try {
    await addDoc(repliesRef, {
      ...replyData,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error al añadir respuesta: ", error);
  }
};

// Borrar una respuesta específica de un comentario
export const deleteReplyFromComment = async (songId, commentId, replyId) => {
  try {
    const replyRef = doc(db, 'songs', songId, 'comments', commentId, 'replies', replyId);
    await deleteDoc(replyRef);
  } catch (error) {
    console.error("Error al borrar respuesta: ", error);
  }
};


// Obtener las respuestas de un comentario específico de una canción
export const getRepliesOfComment = async (songId, commentId) => {
  const repliesRef = collection(db, 'songs', songId, 'comments', commentId, 'replies');
  const q = query(repliesRef, orderBy('createdAt', 'desc')); // Assuming you want to order the replies by creation time
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener respuestas: ", error);
    return []; // Return an empty array in case of error
  }
};

// Añadir un "me gusta" a un comentario específico de una canción
export const addLikeToComment = async (songId, commentId) => {
  const commentRef = doc(db, 'songs', songId, 'comments', commentId);
  try {
    await updateDoc(commentRef, {
      likeCount: increment(1) // Corrección para incrementar correctamente el contador de "me gusta"
    });
    console.log("Me gusta añadido con éxito");
  } catch (error) {
    console.error("Error al añadir me gusta al comentario: ", error);
  }
};

// Función para añadir un "me gusta" a una respuesta específica
export const addLikeToReply = async (songId, commentId, replyId) => {
  const replyRef = doc(db, 'songs', songId, 'comments', commentId, 'replies', replyId);
  try {
    await updateDoc(replyRef, {
      likeCount: increment(1) // Incrementa el contador de "me gusta" en 1
    });
    console.log("Me gusta añadido a la respuesta con éxito");
  } catch (error) {
    console.error("Error al añadir me gusta a la respuesta: ", error);
  }
};


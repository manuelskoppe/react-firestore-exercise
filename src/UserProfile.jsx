// UserProfile.jsx (Nuevo componente para el perfil del usuario)

import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Importaciones para Firestore
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importaciones para Storage

function UserProfile() {
  const { currentUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [image, setImage] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!image) return null;
    const storage = getStorage();
    const imageRef = storageRef(storage, `profileImages/${currentUser.uid}`);
    try {
      const snapshot = await uploadBytes(imageRef, image);
      const photoURL = await getDownloadURL(snapshot.ref);
      console.log('Imagen subida y URL obtenida:', photoURL);
      return photoURL;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      return null;
    }
  };

  const saveProfile = async () => {
    const db = getFirestore();
    const userRef = doc(db, 'users', currentUser.uid);

    try {
      let photoURL = currentUser.photoURL;
      if (image) {
        photoURL = await uploadImage();
      }

      const newUserProfile = {
        displayName: name || currentUser.displayName,
        nationality: nationality || currentUser.nationality,
        ...(photoURL && { photoURL }),
      };

      await setDoc(userRef, newUserProfile, { merge: true });

      console.log('Perfil actualizado con éxito:', newUserProfile);

      // Actualiza el contexto global con los nuevos datos del perfil.
      updateUserProfile(newUserProfile);

      // Restablece los campos del formulario y marca el perfil como actualizado
      setName('');
      setNationality('');
      setImage(null);
      setProfileUpdated(true);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    }
  };

  if (!currentUser) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      {profileUpdated && (
        <div>
          <p>Nombre: {currentUser.displayName}</p>
          <p>Nacionalidad: {currentUser.nationality}</p>
          <img src={currentUser.photoURL || 'url_de_imagen_por_defecto'} alt="Foto de perfil" />
        </div>
      )}
      <div>
        <label>Nombre:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Nacionalidad:</label>
        <input type="text" value={nationality} onChange={handleNationalityChange} />
      </div>
      <div>
        <label>Foto de perfil:</label>
        <input type="file" onChange={handleImageChange} />
      </div>
      <button onClick={saveProfile}>Guardar Cambios</button>
    </div>
  );
}

export default UserProfile;

import React from 'react';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../firebase.js';
import { useState } from 'react';
import { useEffect } from 'react';

const ChooseProfilePicturePage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, 'images/');

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `images/${imageUpload.name + v4()}`
    ); /* v4 -randomized LETTERS */

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      /* uploadFiles - first argument is WHERE you want to upload, second one - WHAT */
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Upload file</button>
      {imageUrls.map((url) => {
        return (
          <img
            key={url} /* ?????????????????????  */
            src={url}
            alt="firebase"
            style={{ width: '50px', height: '50px' }}
          />
        );
      })}
    </div>
  );
};

export default ChooseProfilePicturePage;

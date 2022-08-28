import React from 'react';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../firebase.js';
import { useState } from 'react';
import { useEffect } from 'react';

const ChooseProfilePicturePage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [morePictures, setMorePictures] = useState(false);
  const imagesListRef = ref(storage, 'images/');
  const moreImagesListRef = ref(storage, 'moreImages/');

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

  const moreImages = () => {
    if (imageUpload == null) return;
    const imageRef = ref(
      storage,
      `moreImages/${imageUpload.name + v4()}`
    ); /* v4 -randomized LETTERS */

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      /* uploadFiles - first argument is WHERE you want to upload, second one - WHAT */
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };

  const uploadmoreImages = () => {
    setMorePictures(true);
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
    <div className="container">
      <h1 className="h1-text">Choose a profile picture:</h1>
      <div className="profilePictures">
        {imageUrls.map((url) => {
          return (
            <img
              key={url} /* ?????????????????????  */
              src={url}
              alt="firebase"
              className="profilePicture"
            />
          );
        })}
        {!morePictures && (
          <button className="moreProfilePicturesBtn" onClick={uploadmoreImages}>
            More profile pictures
          </button>
        )}
      </div>
      <h3 className="h3-text">Or download your own:</h3>
      <div className="downloadingField">
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadImage}>Upload file</button>
      </div>
    </div>
  );
};

export default ChooseProfilePicturePage;

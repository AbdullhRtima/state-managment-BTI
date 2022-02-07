import React, { useState, useCallback, useEffect } from 'react';
import { storage, uploadBytesResumable, ref, getDownloadURL, listAll } from '../../utils/firebase';
import { uniq } from 'lodash';
import './ImageUploader.css';

const ImageUploader = () => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [listAllImages, setListAllImage] = useState([]);

    const handleChange = useCallback((e) => {
        setImage(e.target.files[0]);
    });

    const handleUpload = () => {
        // const uploadTask = storageRef.ref(`images/${image.name}`).put(image);
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        setUrl(downloadURL)
                    });
            }
        );
    };

    useEffect(() => {
        // Create a reference under which you want to list
        const listRef = ref(storage, 'images');
        // Find all the prefixes and items.
        listAll(listRef)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    // All the prefixes under listRef.
                    // You may call listAll() recursively on them.
                });
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then(url => {
                        setListAllImage(prev => uniq([...prev, url]));
                    });
                });
            }).catch((error) => {
                console.log("🚀 ~ file: ImageUploader.jsx ~ line 68 ~ .then ~ error", error)
                // Uh-oh, an error occurred!
            });
    }, [url]);

    return (
        <div>
            <progress value={progress} max="100" /> {Math.round(progress)}%
            <input type="file" id="file" name="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <div className='list-image'>
                {listAllImages.map((image, index) => {
                    return (
                        <img className='img' key={index} src={image} alt="uploaded-image" />
                    )
                })}
            </div>
        </div>
    )
};

export default ImageUploader;

import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'


const useFirebaseImage = (setValue, getValues) => {
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState("");

    if(!setValue || !getValues) return;
  const handleUpLoadImage = (file) => {
    const storage = getStorage()
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);   
uploadTask.on('state_changed',
(snapshot) => {
  const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  setProgress(progressPercent)
  switch (snapshot.state) {
    case 'paused':  
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
      default:
        console.log("Nothing at all")
  }
}, 
(error) => {
  console.log('Error');
}, 
() => {
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    setImage(downloadURL)
  });
}
);
  }
  const handleSelectImage = (e) => {
    const file = e.target.files[0]
    if(!file) return;  
    setValue("image_name", file.name);
    handleUpLoadImage(file)
  }

  const handleDeleteImage = () => {
    const storage = getStorage();
const imageRef = ref(storage, 'images/'+getValues('image_name') );
deleteObject(imageRef).then(() => {
  console.log("Đã xóa ảnh")
  setImage(" ");
  setProgress(0);
}).catch((error) => {
  console.log("không thể xóa ảnh")
});
  }

  const handleResetUpload = () => {
    setImage("");
    setProgress(0)
  }
  return {
    handleResetUpload,
    image,
    progress,
    handleSelectImage,
    handleDeleteImage
  }
    
  
}

export default useFirebaseImage




 
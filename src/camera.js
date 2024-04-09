import React, { useState, useRef } from 'react';
import piexif from 'piexif';
import './camera.css';

const CameraApp = () => {
  const [photoData, setPhotoData] = useState(null);
  const videoRef = useRef(null);

  const handleCapturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const mediaStreamTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
  
      const photoBlob = await imageCapture.takePhoto();
  
      // Get geolocation data
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
  
      // Attach geolocation data to the image
      const imageWithGeoTag = await addGeoTagToImage(photoBlob, latitude, longitude);
  
      setPhotoData(imageWithGeoTag);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };
  

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const addGeoTagToImage = async (photoBlob, latitude, longitude) => {
    const exifObj = {
      '0th': {},
      Exif: {},
    };

    exifObj['0th'][piexif.ImageIFD.Make] = 'Camera';
    exifObj['0th'][piexif.ImageIFD.Model] = 'Model';

    exifObj.Exif[piexif.ExifIFD.DateTimeOriginal] = new Date().toISOString();
    exifObj.Exif[piexif.ExifIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(latitude);
    exifObj.Exif[piexif.ExifIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(longitude);

    exifObj.Exif[piexif.ExifIFD.GPSLatitudeRef] = latitude < 0 ? 'S' : 'N';
    exifObj.Exif[piexif.ExifIFD.GPSLongitudeRef] = longitude < 0 ? 'W' : 'E';

    const exifBytes = piexif.dump(exifObj);
    const modifiedPhotoBlob = await piexif.insert(exifBytes, photoBlob);

    return URL.createObjectURL(new Blob([modifiedPhotoBlob], { type: 'image/jpeg' }));
  };

  return (
    <div>
      <button onClick={handleCapturePhoto}>Capture Photo</button>
      <video ref={videoRef} style={{ display: 'none' }} />
      {photoData && <img src={photoData} alt="Captured" style={{ maxWidth: '100%' }} />}
    </div>
  );
};

export default CameraApp;

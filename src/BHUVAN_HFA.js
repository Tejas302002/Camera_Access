import React, { useState, useRef } from 'react';
import piexif from 'piexif';


 const BhuvanHFAForm = () => {
  const [formState, setFormState] = useState({
    userName: '',
    observerName: '',
    mobileNumber: '',
    projectName: '',
    photo1: null,
    photo2: null,
    photo1Latitude: '',
    photo1Longitude: '',
    photo2Latitude: '',
    photo2Longitude: '',
    isCameraOpen: false // New state to track whether the camera is open or not
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStartCamera = () => {
    setFormState(prevState => ({
      ...prevState,
      isCameraOpen: true // Open the camera when clicked on "Capture Image" option
    }));
  };

  const handleCloseCamera = () => {
    setFormState(prevState => ({
      ...prevState,
      isCameraOpen: false // Close the camera
    }));
  };

  const handleCapturePhoto = (photoData) => {
    if (!formState.photo1) {
      setFormState(prevState => ({
        ...prevState,
        photo1: photoData, // Update the captured photo data for photo 1
        isCameraOpen: false // Close the camera after capturing photo
      }));
    } else if (!formState.photo2) {
      setFormState(prevState => ({
        ...prevState,
        photo2: photoData, // Update the captured photo data for photo 2
        isCameraOpen: false // Close the camera after capturing photo
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formState);
    // Reset form fields after submission if needed
  };

  return (
    <div>
      <h2>Bhuvan HFA Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input type="text" name="userName" value={formState.userName} onChange={handleChange} />
        </label>
        <label>
          Observer Name:
          <input type="text" name="observerName" value={formState.observerName} onChange={handleChange} />
        </label>
        <label>
          Mobile Number:
          <input type="text" name="mobileNumber" value={formState.mobileNumber} onChange={handleChange} />
        </label>
        <label>
          Project Name:
          <input type="text" name="projectName" value={formState.projectName} onChange={handleChange} />
        </label>
        {/* Add other input fields */}
        <div>
          <button type="button" onClick={handleStartCamera}>Capture Photo 1</button>
          <button type="button" onClick={handleStartCamera}>Capture Photo 2</button>
        </div>
        {formState.isCameraOpen && (
          <CameraApp onCloseCamera={handleCloseCamera} onCapturePhoto={handleCapturePhoto} />
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const CameraApp = ({ onCloseCamera, onCapturePhoto }) => {
  const [photoData, setPhotoData] = useState(null);
  const videoRef = useRef(null);

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCapturePhoto = async () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Get geolocation data
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        // Attach geolocation data to the image
        const imageData = canvas.toDataURL('image/jpeg');
        const imageWithGeoTag = addGeoTagToImage(imageData, latitude, longitude);

        setPhotoData(imageWithGeoTag);

        // Pass captured photo data to the parent component
        onCapturePhoto(imageWithGeoTag);
      } catch (error) {
        console.error('Error accessing geolocation:', error);
      }
    }
  };

  const handleUploadPhoto = () => {
    // Implement upload functionality here
    console.log('Photo uploaded:', photoData);
    setPhotoData(null); // Clear photo data after upload
  };

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const addGeoTagToImage = (imageData, latitude, longitude) => {
    // Convert the base64 image data to binary
    const byteString = atob(imageData.split(',')[1]);
    const mimeType = imageData.split(',')[0].split(':')[1].split(';')[0];

    // Create an ArrayBuffer and Uint8Array to manipulate binary data
    const buffer = new ArrayBuffer(byteString.length);
    const uInt8Array = new Uint8Array(buffer);

    // Fill the Uint8Array with binary data
    for (let i = 0; i < byteString.length; i++) {
      uInt8Array[i] = byteString.charCodeAt(i);
    }

    // Load existing EXIF data if available or create new EXIF data
    const exifData = piexif.load(buffer) || {};
    const zeroth = exifData['0th'] || {};
    const exif = exifData.Exif || {};

    // Set required EXIF data
    zeroth[piexif.ImageIFD.Make] = 'Camera';
    zeroth[piexif.ImageIFD.Model] = 'Model';
    exif[piexif.ExifIFD.DateTimeOriginal] = new Date().toISOString();
    exif[piexif.ExifIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(latitude);
    exif[piexif.ExifIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(longitude);
    exif[piexif.ExifIFD.GPSLatitudeRef] = latitude < 0 ? 'S' : 'N';
    exif[piexif.ExifIFD.GPSLongitudeRef] = longitude < 0 ? 'W' : 'E';

    // Merge new EXIF data with existing data
    const exifObj = {
      '0th': zeroth,
      Exif: exif,
    };

    // Dump the new EXIF data to binary
    const exifBytes = piexif.dump(exifObj);

    // Insert the new EXIF data into the original binary image data
    const newData = piexif.insert(exifBytes, imageData);

    // Return the base64 representation of the modified binary data
    return 'data:' + mimeType + ';base64,' + btoa(newData);
};

return (
    <div>
      <button onClick={handleStartCamera}>Start Camera</button>
      <button onClick={handleCapturePhoto}>Capture Photo</button>
      <button onClick={onCloseCamera}>Close Camera</button>
      {photoData && (
        <>
          <button onClick={handleUploadPhoto}>Upload Photo</button>
          <img src={photoData} alt="Captured" style={{ maxWidth: '100%' }} />
        </>
      )}
      <video ref={videoRef} autoPlay muted style={{ maxWidth: '100%' }} />
    </div>
  );
      };

      export default BhuvanHFAForm;
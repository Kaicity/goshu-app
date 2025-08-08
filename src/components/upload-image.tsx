// "use client";

// import React, { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { IoCloudUploadOutline } from "react-icons/io5";
// import Image from "next/image";
// import Link from "next/link";
// import RadialProgress from "./ui/progress";
// import { uploadImageToCloudinary } from "@/lib/api";
// import { AxiosProgressEvent } from "axios";

// const apiKey = process.env.NEXT_PUBLIC_API_KEY;
// const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

// interface ImageUploadProps {
//   onUploadComplete?: (url: string) => void;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadComplete }) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [progress, setProgress] = useState<number>(0);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

//   const onUploadProgress = (progressEvent: AxiosProgressEvent) => {
//     if (progressEvent.total) {
//       const percentage = Math.round(
//         (progressEvent.loaded * 100) / progressEvent.total
//       );
//       setProgress(percentage);
//     }
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files?.length) {
//       const image = event.target.files[0];
//       setSelectedImage(image);
//     }
//   };

//   const removeSelectedImage = () => {
//     setLoading(false);
//     setUploadedImagePath(null);
//     setSelectedImage(null);
//   };

//   const handleImageUpload = async (image: File) => {
//     if (!image) return;
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", uploadPreset as string);
//     formData.append("api_key", apiKey as string);

//     try {
//       const res = await uploadImageToCloudinary(formData, onUploadProgress);
//       if (res.status === 200) {
//         setLoading(false);
//         setUploadedImagePath(res.data.url);
//         if (onUploadComplete) {
//           onUploadComplete(res.data.url);
//         }
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Error uploading image:", error);
//     }
//   };

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     if (acceptedFiles.length > 0) {
//       const image = acceptedFiles[0];
//       setSelectedImage(image);
//     }
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });

//   return (
//     <div className="space-y-3 h-full">
//       <div {...getRootProps()} className="h-full">
//         <label
//           htmlFor="dropzone-file"
//           className="relative flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 w-full visually-hidden-focusable h-full"
//         >
//           {loading && (
//             <div className="text-center max-w-md">
//               <RadialProgress progress={progress} />
//               <p className="text-sm font-semibold">Uploading Picture</p>
//               <p className="text-xs text-gray-400">
//                 Do not refresh or perform any other action while the picture is being uploaded
//               </p>
//             </div>
//           )}

//           {!loading && !uploadedImagePath && !selectedImage && (
//             <div className="text-center">
//               <div className="border p-2 rounded-md max-w-min mx-auto">
//                 <IoCloudUploadOutline size="1.6em" />
//               </div>
//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                 <span className="font-semibold">Drag an image</span>
//               </p>
//               <p className="text-xs text-gray-400 dark:text-gray-400">
//                 Select a image or drag here to upload directly
//               </p>
//             </div>
//           )}

//           {!loading && selectedImage && !uploadedImagePath && (
//             <div className="text-center space-y-2">
//               <p className="text-sm font-semibold">Image Selected</p>
//               <p className="text-xs text-gray-400">Click upload to send the image</p>
//             </div>
//           )}

//           {uploadedImagePath && !loading && (
//             <div className="text-center space-y-2">
//               <Image
//                 width={1000}
//                 height={1000}
//                 src={uploadedImagePath}
//                 className="w-full object-contain max-h-16 opacity-70"
//                 alt="uploaded image"
//               />
//               <div className="space-y-1">
//                 <p className="text-sm font-semibold">Image Uploaded</p>
//                 <p className="text-xs text-gray-400">
//                   Click here to upload another image
//                 </p>
//               </div>
//             </div>
//           )}
//         </label>

//         <Input
//           {...getInputProps()}
//           id="dropzone-file"
//           accept="image/png, image/jpeg"
//           type="file"
//           className="hidden"
//           disabled={loading || uploadedImagePath !== null}
//           onChange={handleImageChange}
//         />
//       </div>

//       {/* Nút Upload */}
//       {!!selectedImage && !uploadedImagePath && !loading && (
//         <Button
//           onClick={() => handleImageUpload(selectedImage)}
//           type="button"
//           className="w-full"
//         >
//           Upload Selected Image
//         </Button>
//       )}

//       {/* Đã upload xong */}
//       {!!uploadedImagePath && (
//         <div className="flex items-center justify-between">
//           <Link
//             href={uploadedImagePath}
//             className="text-gray-500 text-xs hover:underline"
//           >
//             Click here to see uploaded image :D
//           </Link>

//           <Button
//             onClick={removeSelectedImage}
//             type="button"
//             variant="secondary"
//           >
//             Remove
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { IoCloudUploadOutline } from 'react-icons/io5';
import Image from 'next/image';
import RadialProgress from './ui/progress';

interface ImageUploadProps {
  onImageSelect?: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const image = event.target.files[0];
      simulateFakeUpload(image);
    }
  };

  const simulateFakeUpload = (image: File) => {
    setSelectedImage(image);
    if (onImageSelect) onImageSelect(image);
    setProgress(0);
    setLoading(true);

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);

    // Simulate progress 0 → 100% in 1.5s
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setLoading(false);
      }
    }, 150);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setProgress(0);
    setLoading(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      simulateFakeUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, noClick: true });

  return (
    <div className="space-y-3 h-full">
      <div {...getRootProps()} className="h-full">
        <label
          htmlFor="dropzone-file"
          className="relative flex flex-col items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 w-full h-full"
        >
          {loading && (
            <div className="text-center max-w-md">
              <RadialProgress progress={progress} />
              <p className="text-sm font-semibold mt-2">Processing Image</p>
              <p className="text-xs text-gray-400">Please wait while the image is being prepared...</p>
            </div>
          )}

          {!loading && !selectedImage && (
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <IoCloudUploadOutline size="1.6em" />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Drag an image</span>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400">Or click to select from your computer</p>
            </div>
          )}

          {previewUrl && !loading && (
            <div className="text-center space-y-2">
              <Image
                width={1000}
                height={1000}
                src={previewUrl}
                className="w-full object-contain max-h-32 rounded-md"
                alt="Preview"
              />
              <p className="text-sm text-gray-500">Image selected (not uploaded)</p>
            </div>
          )}
        </label>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {selectedImage && !loading && (
        <div className="flex justify-end">
          <Button onClick={removeSelectedImage} type="button" variant="secondary">
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

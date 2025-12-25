/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

 // define storage for images
 const profileStorage = multer.diskStorage({
   // destination: (req, file, cb) => {
   //   cb(null, "uploads/profile-image");
   // },
   destination: function (req: Request, file, cb) {
       let uploadPath = `uploads/${file.fieldname}`;
 
       cb(null, uploadPath);
   },
 
   filename: (req, file, cb) => {
     //extract the file extension from filename
     const fileExtension = path.extname(file.originalname);
 
     const fileName = file.originalname.replace(fileExtension, "").toLowerCase().split(" ").join("-") +"-" + Date.now();
 
     cb(null, fileName + fileExtension);
   },
 });
 
 // upload user image
 export const uploadProfile = multer({
   storage: profileStorage,
 
   limits: {
     fileSize: 3145728, // 3MB . less than 3mb file allowed
    //  fieldSize: 3 * 1024 *1024
   },
 
   fileFilter: (req, file, cb) => {
    
       if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {
 
         cb(null, true);
 
       } else {
         cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
       }
     
   },
 });


 // upload post image
 export const uploadPostImage = multer({
   storage: profileStorage,
 
   limits: {
     fileSize: 3145728, // 3MB . less than 3mb file allowed
    //  fieldSize: 3 * 1024 *1024
   },
 
   fileFilter: (req, file, cb) => {
    
       if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {
 
         cb(null, true);
 
       } else {
         cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
       }
     
   },
 });

 // upload category image
 export const uploadCategoryImage = multer({
   storage: profileStorage,
 
   limits: {
     fileSize: 3145728, // 3MB . less than 3mb file allowed
    //  fieldSize: 3 * 1024 *1024
   },
 
   fileFilter: (req, file, cb) => {
    
       if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {
 
         cb(null, true);
 
       } else {
         cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
       }
     
   },
 });

 // upload category image
 export const uploadPromotionalImage = multer({
   storage: profileStorage,
 
   limits: {
     fileSize: 3145728, // 3MB . less than 3mb file allowed
    //  fieldSize: 3 * 1024 *1024
   },
 
   fileFilter: (req, file, cb) => {
    
       if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" ) {
 
         cb(null, true);
 
       } else {
         cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
       }
     
   },
 });

// upload promotional video
export const uploadPromotionalVideo = multer({
  storage: profileStorage,

  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/avi",
      "video/mov",
      "video/wmv",
      "video/flv",
      "video/mkv",
      "video/3gp"
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only video files are allowed (mp4, webm, ogg, mov)"
        )
      );
    }
  },
});


 // preapre the final multer upload object
//  export const uploadDocument = multer({
//    storage: profileStorage,
 
//    limits: {
//      fileSize: 3145728, // 3MB . less than 3mb file allowed
//     //  fieldSize: 3 * 1024 *1024
//    },
 
//    fileFilter: (req, file, cb) => {
    
//        if (file.mimetype === "application/pdf" ) {
 
//          cb(null, true);
 
//        } else {
//          cb(new Error("Only pdf file format allowed!"));
//        }
     
//    },
//  });




import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: 'mdaarifraza',
  api_key: '183692939552568',
  api_secret: 'HhSc0XZYStd2w9Skdi0jmjS3Sy4',
})

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null;
  }
};


export { uploadOnCloudinary };

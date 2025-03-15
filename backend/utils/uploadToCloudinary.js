import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath, options = {}) => {
    try {
        const defaultOptions = {
            folder: "images",
            resource:"auto"

        };

        const uploadOptions = { ...defaultOptions, ...options };

        const result = await cloudinary.uploader.upload(filePath, uploadOptions);
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("Error uploading file to Cloudinary");
    }
};

export const uploadToCloudinaryFiles = async (fileBase64) => {
    try {
      const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
        folder: "kyc-documents", // Cloudinary folder
      });
      return uploadResponse.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      throw new Error("Cloudinary upload failed");
    }
  };
import { KYC } from "../models/kycModel.js";
import User from "../models/userModel.js";
import { uploadToCloudinaryFiles } from "../utils/uploadToCloudinary.js";

export const submitKYC = async (req, res) => {
    try {
      const { userId, documentType, documentNumber, issuedDate, expiryDate, documentFront, documentBack } = req.body;
  
      if (!documentFront) {
        return res.status(400).json({ message: "Front document image is required" });
      }
  
      const existingKYC = await KYC.findOne({ userId });
      if (existingKYC) {
        return res.status(400).json({ message: "KYC document already submitted" });
      }
      const frontImageUrl = await uploadToCloudinaryFiles(documentFront);
      const backImageUrl = documentBack ? await uploadToCloudinaryFiles(documentBack) : null;
  
      const newKYC = new KYC({
        userId,
        documentType,
        documentNumber,
        documentFront: frontImageUrl,
        documentBack: backImageUrl,
        issuedDate,
        expiryDate,
        verificationStatus: "pending",
      });
  
      await newKYC.save();
      await User.findByIdAndUpdate(userId, { kycStatus: "pending" });
  
      res.status(201).json({ message: "KYC submitted successfully", kyc: newKYC });
    } catch (error) {
      res.status(500).json({ message: "Error submitting KYC", error: error.message });
    }
  };
//change
export const verifyKYC = async (req, res) => {
try {
  const userId = req.user._id;
  const isVerifiedUser = await User.findByIdAndUpdate({ _id: userId }, { kycStatus: "verified" },{new:true});
  res.json({ message: "User verified successfully", user: isVerifiedUser });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Error verifying KYC", error: error.message });
}
};


export const getKYCDetails = async (req, res) => {
  try {
    const kycDocuments = await KYC.find().populate("userId", "fullName email role");
    res.status(200).json(kycDocuments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching KYC details", error: error.message });
  }
};


export const getUserKYC = async (req, res) => {
  try {
    const { userId } = req.params;
    const kycDocument = await KYC.findOne({ userId });

    if (!kycDocument) {
      return res.status(404).json({ message: "KYC document not found" });
    }

    res.status(200).json(kycDocument);
  } catch (error) {
    res.status(500).json({ message: "Error fetching KYC details", error: error.message });
  }
};

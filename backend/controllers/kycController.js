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
    const { kycId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!["verified", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const kycDocument = await KYC.findById(kycId);
    if (!kycDocument) {
      return res.status(404).json({ message: "KYC document not found" });
    }

    kycDocument.verificationStatus = status;
    kycDocument.verifiedAt = status === "verified" ? new Date() : null;
    kycDocument.rejectionReason = status === "rejected" ? rejectionReason : null;
    await kycDocument.save();

    await User.findByIdAndUpdate(kycDocument.userId, { kycStatus: status });

    res.status(200).json({ message: `KYC ${status} successfully`, kycDocument });
  } catch (error) {
    res.status(500).json({ message: "Error updating KYC status", error: error.message });
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

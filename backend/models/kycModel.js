import mongoose  from "mongoose"

//chnage
const KYCDocumentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    documentType: { type: String, enum: ['passport', 'national_id', 'drivers_license', 'utility_bill'], required: true },
    documentNumber: { type: String },
    documentFront: { type: String, required: true },
    documentBack: String,
    issuedDate: Date,
    expiryDate: Date,
    verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    rejectionReason: String,
    verifiedAt: Date
  }, { timestamps: true });


export const KYC = mongoose.model('KYC', KYCDocumentSchema);  
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EKYCForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const documentTypes = [
        { value: 'passport', label: 'Passport' },
        { value: 'national_id', label: 'National ID' },
        { value: 'drivers_license', label: "Driver's License" },
        { value: 'utility_bill', label: 'Utility Bill' }
    ];

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);
        
        // Create FormData object to handle file uploads
        const formData = new FormData();
        formData.append('userId', data.userId); // Assuming userId is available
        formData.append('documentType', data.documentType);
        formData.append('documentNumber', data.documentNumber);
        formData.append('documentFront', data.documentFront[0]);
        
        if (data.issuedDate) {
            formData.append('issuedDate', data.issuedDate);
        }
        
        if (data.expiryDate) {
            formData.append('expiryDate', data.expiryDate);
        }
        
        try {
            // Replace with your API endpoint
            const response = await axios.post('/api/kyc/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setSubmitStatus({ type: 'success', message: 'Documents submitted successfully! Your verification is pending.' });
            reset();
        } catch (error) {
            setSubmitStatus({ 
                type: 'error', 
                message: error.response?.data?.message || 'Failed to submit documents. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">KYC Document Verification</h1>
            
            {submitStatus && (
                <div className={`p-4 mb-6 rounded ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitStatus.message}
                </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block mb-2 font-medium">Document Type *</label>
                    <select
                        {...register('documentType', { required: 'Document type is required' })}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select document type</option>
                        {documentTypes.map(doc => (
                            <option key={doc.value} value={doc.value}>{doc.label}</option>
                        ))}
                    </select>
                    {errors.documentType && <p className="text-red-600 mt-1">{errors.documentType.message}</p>}
                </div>

                <div>
                    <label className="block mb-2 font-medium">Document Number</label>
                    <input
                        type="text"
                        {...register('documentNumber')}
                        placeholder="Enter document number"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block mb-2 font-medium">Document Front Side *</label>
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        {...register('documentFront', { required: 'Front side image is required' })}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.documentFront && <p className="text-red-600 mt-1">{errors.documentFront.message}</p>}
                    <p className="text-sm text-gray-500 mt-1">Upload a clear image or PDF (max 5MB)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2 font-medium">Issue Date</label>
                        <input
                            type="date"
                            {...register('issuedDate')}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Expiry Date</label>
                        <input
                            type="date"
                            {...register('expiryDate')}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded font-medium text-white bg-blue-600 hover:bg-blue-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Documents for Verification'}
                    </button>
                </div>
                
                <div className="text-sm text-gray-600 mt-4">
                    <p>* Required fields</p>
                    <p>Note: Your documents will be reviewed by our compliance team. You will be notified once the verification is complete.</p>
                </div>
            </form>
        </div>
    );
};

export default EKYCForm;

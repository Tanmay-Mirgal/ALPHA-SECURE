import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EKYCForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [stream, setStream] = useState(null);

    const documentTypes = [
        { value: 'passport', label: 'Passport' },
        { value: 'national_id', label: 'National ID' },
        { value: 'drivers_license', label: "Driver's License" },
        { value: 'utility_bill', label: 'Utility Bill' }
    ];

    const startWebcam = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    };

    const stopWebcam = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    useEffect(() => {
        return () => stopWebcam();
    }, []);

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        if (canvas && video) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/png');
            setCapturedImage(imageData);
            stopWebcam();
        }
    };

    const verifyFace = async () => {
        if (!capturedImage) {
            setSubmitStatus({ type: 'error', message: 'Please capture an image first.' });
            return;
        }

        setIsVerifying(true);
        setIsVerified(false);

        try {
            const blob = await fetch(capturedImage).then(res => res.blob());
            const formData = new FormData();
            formData.append('file', blob, 'captured-image.png');

            const response = await axios.post('http://127.0.0.1:5000/verify-face', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.verified) {
                setIsVerified(true);
                setSubmitStatus({ type: 'success', message: 'Face verification successful!' });
            } else {
                setSubmitStatus({ type: 'error', message: 'Face verification failed. Try again.' });
            }
        } catch (error) {
            console.error('Face verification error:', error);
            setSubmitStatus({ type: 'error', message: 'Error verifying face. Check backend logs.' });
        } finally {
            setIsVerifying(false);
        }
    };

    const onSubmit = async (data) => {
        if (!isVerified) {
            setSubmitStatus({ type: 'error', message: 'Face verification required before submitting.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);
        const formData = new FormData();
        formData.append('userId', data.userId);
        formData.append('documentType', data.documentType);
        formData.append('documentNumber', data.documentNumber);
        formData.append('documentFront', data.documentFront[0]);
        if (data.issuedDate) formData.append('issuedDate', data.issuedDate);
        if (data.expiryDate) formData.append('expiryDate', data.expiryDate);

        try {
            await axios.post('http://127.0.0.1:5000/submit-docs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSubmitStatus({ type: 'success', message: 'Documents submitted successfully! Verification pending.' });
            reset();
            setCapturedImage(null);
            setIsVerified(false);
        } catch (error) {
            console.error('Document submission error:', error);
            setSubmitStatus({ type: 'error', message: 'Failed to submit documents. Check backend logs.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">eKYC Verification</h1>

            {submitStatus && (
                <div className={`p-3 mb-4 rounded-md text-center ${submitStatus.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {submitStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium">Document Type *</label>
                    <select {...register('documentType', { required: 'Document type is required' })} className="w-full mt-1 p-3 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-blue-300">
                        <option value="">Select document type</option>
                        {documentTypes.map(doc => <option key={doc.value} value={doc.value}>{doc.label}</option>)}
                    </select>
                    {errors.documentType && <p className="text-red-600 text-sm">{errors.documentType.message}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Upload Front Side *</label>
                    <input type="file" accept="image/*,.pdf" {...register('documentFront', { required: 'Front side image is required' })} className="w-full mt-1 p-2 border rounded-md bg-gray-50" />
                    {errors.documentFront && <p className="text-red-600 text-sm">{errors.documentFront.message}</p>}
                </div>

                <div className="pt-4">
                    <h2 className="text-lg font-semibold text-gray-800">Face Verification</h2>
                    <video ref={videoRef} autoPlay className={`w-full max-w-sm rounded-md shadow-md border ${capturedImage ? 'hidden' : ''}`} />
                    <canvas ref={canvasRef} className="hidden" width="640" height="480"></canvas>
                    {capturedImage && <img src={capturedImage} alt="Captured" className="w-full max-w-sm mt-2 rounded-md shadow-md" />}
                    
                    <div className="flex gap-2 mt-3">
                        <button type="button" onClick={startWebcam} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md">Start Webcam</button>
                        <button type="button" onClick={captureImage} className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md">Capture</button>
                        <button type="button" onClick={verifyFace} className={`px-4 py-2 rounded-md text-white ${isVerifying ? 'bg-gray-500' : 'bg-purple-500'} shadow-md`} disabled={isVerifying}>{isVerifying ? 'Verifying...' : 'Verify Face'}</button>
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting || !isVerified} className="w-full py-3 rounded-md font-medium text-white bg-blue-600 shadow-md hover:bg-blue-700 transition">{isSubmitting ? 'Submitting...' : 'Submit Documents'}</button>
            </form>
        </div>
    );
};

export default EKYCForm;

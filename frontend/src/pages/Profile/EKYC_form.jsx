import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Camera, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { changeVerification } = useAuthStore();

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Unable to access webcam. Check permissions.' });
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
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setCapturedImage(canvas.toDataURL('image/png'));
    stopWebcam();
  };

  const verifyFace = async () => {
    if (!capturedImage) {
      setSubmitStatus({ type: 'error', message: 'Please capture an image first.' });
      return;
    }

    setIsVerifying(true);
    try {
      const formData = new FormData();
      formData.append('file', await fetch(capturedImage).then(res => res.blob()), 'captured-image.png');

      const response = await axios.post('http://localhost:5000/verify-face', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.verified) {
          setIsVerified(true);
          setSubmitStatus({ type: 'success', message: 'Face verification successful!' });
          setTimeout(() => {
           navigate('/profile');
         }, 2000);
        const res = await changeVerification();
        if (res){
            setSubmitStatus({ type: 'success', message: 'Verification successful! Redirecting to profile...' });
        }

      } else {
        setSubmitStatus({ type: 'error', message: 'Face verification successful !!!' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Error during face verification. Try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  const onSubmit = async (data) => {
    if (!isVerified) {
      setSubmitStatus({ type: 'error', message: 'Please complete face verification before submitting.' });
      return;
    }

    setIsSubmitting(true);
    try {
      
      const res = await changeVerification();
      if (res.kycStatus === 'verified') {
        setSubmitStatus({ type: 'success', message: 'Verification successful! Redirecting to profile...' });
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setSubmitStatus({ type: 'error', message: 'Error submitting form. Try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Error submitting form. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">eKYC Verification</h1>
        <p className="mt-2 text-gray-600">Complete your identity verification process</p>
      </div>

      {submitStatus && (
        <div className={`p-4 mb-6 rounded-lg flex items-center gap-2 ${submitStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {submitStatus.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p>{submitStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Face Verification */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Face Verification</h2>
          <div className="space-y-4">
            <div className="relative">
              {!capturedImage && <video ref={videoRef} autoPlay className="w-full h-[300px] rounded-lg bg-gray-100 object-cover" />}
              {capturedImage && <img src={capturedImage} alt="Captured" className="w-full h-[300px] rounded-lg object-cover" />}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={startWebcam} className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md">Start Camera</button>
              <button type="button" onClick={captureImage} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md">Capture</button>
              <button type="button" onClick={verifyFace} disabled={isVerifying || !capturedImage} className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md">
                {isVerifying ? 'Verifying...' : 'Verify Face'}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting || !isVerified} className="w-full bg-blue-600 text-white px-4 py-3 rounded-md">
          {isSubmitting ? 'Submitting...' : 'Submit Documents'}
        </button>
      </form>
    </div>
  );
};

export default EKYCForm;

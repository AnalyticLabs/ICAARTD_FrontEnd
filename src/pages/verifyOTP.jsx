import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp, resendOtp } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, userRole } = location.state || {};
  const role = userRole || useSelector((state) => state.auth.role);

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);
  const { loading, error, otpMessage } = useSelector((state) => state.auth);

  // Auto focus next input
  const handleChange = (element, index) => {
    if (/^[0-9]?$/.test(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);
      if (element.value && index < 5) inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) return toast.error('Enter complete OTP');

    let toastId;
    try {
      toastId = toast.loading('Verifying OTP...');
      const resultAction = await dispatch(
        verifyOtp({ email, otp: otpValue, role })
      ).unwrap();
      toast.success('Email verified successfully!', { id: toastId });

      // Redirect based on role
      if (resultAction.user.role === 'admin') navigate('/dashboard');
      else navigate('/submit-paper');
    } catch (err) {
      toast.error(err || 'Verification failed');
    }
  };

  const handleResend = async () => {
    if (!email || !role) return toast.error('Email or role not available');

    let toastId;
    try {
      toastId = toast.loading('Resending OTP...');
      const message = await dispatch(resendOtp({ email, role })).unwrap();
      toast.success(message || 'OTP resent successfully', { id: toastId });
    } catch (err) {
      toast.error(err || 'Resending OTP failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Verify Your Email
        </h2>
        <p className="mb-6 text-gray-600 text-center">
          Enter the 6-digit OTP sent to <strong>{email}</strong>
        </p>

        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-300 text-lg"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-xl mb-4 hover:bg-indigo-700 transition"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <button
          onClick={handleResend}
          disabled={loading}
          className="w-full cursor-pointer text-indigo-600 border border-indigo-600 py-3 rounded-xl hover:bg-indigo-50 transition"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

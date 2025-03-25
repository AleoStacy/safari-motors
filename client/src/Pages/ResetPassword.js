import React, { useState } from 'react';

import { useSearchParams,useNavigate } from 'react-router-dom';
import "./Login.css"; // Ensure this file is create

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword,setConfirmNewPassword] = useState('')
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
          setMessage("Passwords do not match.");
          return;
        }
        try {
          const response = await fetch('https://safari-motors-production.up.railway.app/api/auth/reset-password', {  
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              token: token,  
              newPassword: newPassword 
            })
          });
          
          if (response.ok) {
            const data = await response.json();
            setMessage(`${data.msg}. Navigate to login`);
          } else {
            const errorData = await response.json();
            setMessage(errorData.error.message || errorData.msg);
          }
        } catch (error) {
          console.error(error);
          setMessage("An error occurred. Please try again.");
        }
      };

    return (
        <div className="login-page">
      <div className="login-box">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
        </div>
    );
};

export default ResetPassword;
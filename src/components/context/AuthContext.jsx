import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = import.meta.env.VITE_BACKEND_URI;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ---------- Auth State ----------
  const [auth, setAuth] = useState({ success: false, user: null });
  const [loading, setLoading] = useState(true);

  // ---------- Fetch User / Is-Auth ----------
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true });
      if (response.data.success) {
        setAuth({ success: true, user: response.data.user });
      } else {
        setAuth({ success: false, user: null });
      }
    } catch (error) {
      setAuth({ success: false, user: null });
    } finally {
      setLoading(false);
    }
  };

  // ---------- Logout ----------
  const logOut = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        setAuth({ success: false, user: null });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // ---------- Reset Password APIs ----------
  const sendResetOtp = async (email) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, { email });
      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const verifyResetOtp = async (email, otp) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/verify-reset-otp`, { email, otp });
      if (res.data.success){
        console.log(res.data.resetToken);
        localStorage.setItem("resetToken",res.data.resetToken)
        
        toast.success(res.data.message);

      } 
      else toast.error(res.data.message);
      return res.data; // contains resetToken
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  const resetPassword = async (resetToken, newPassword) => {
    try {
      const res = await axios.post(`${backendUrl}/api/auth/reset-password`, { resetToken, newPassword });
      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
      throw err;
    }
  };

  // ---------- Initial Fetch ----------
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        logOut,
        refetchAuth: fetchUserData,
        sendResetOtp,
        verifyResetOtp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ---------- Hook ----------
export const useAuth = () => useContext(AuthContext);

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import toastAlert from '../utils/alert';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {

  const [signinFormInfo, setSigninFormInfo] = useState({});
  const [otp, setOtp] = useState(null);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const { setIsUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      setLoading(true)
      const name = event?.target?.name?.value;
      const email = event?.target?.email?.value;
      const password = event?.target?.password?.value;
      console.log(email, password);

      if (!name || !email || !password) {
        alert("Name/Email/Password is not eneterd correctly.");
      }

      const response = await axiosInstance.post("/auth/signup", signinFormInfo);

      if (response?.status === 200 && response?.data?.success) {
        toastAlert("info", "Please enter otp.");
        setShowOtpScreen(true);
      }
      else {
        throw new Error(response?.data?.message || "Something Went Wrong.");
      }
      console.log("response", response);
    }
    catch (error) {
      toastAlert("error", error?.message)
      console.log(error?.message || "Something Went Wrong");
    }
    finally {
      setLoading(false);
    }
  }

  const handleOtpSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axiosInstance.post("/auth/verify-otp", {
        email: signinFormInfo?.email,
        otp
      });

      if (response?.status === 200 && response?.data?.success) {
        localStorage.setItem("userInfo", JSON.stringify(response?.data?.data));
        localStorage.setItem("token", response?.data?.data?.token);
        setIsUserAuthenticated(response?.data?.data?.token);
        toastAlert("success", "Otp Verified Successfully.");
        navigate("/");
      }
      else {
        throw new Error(response?.data?.message || "Something Went Wrong.");
      }

    }
    catch (error) {
      toastAlert("error", error?.message || "Something Went Wrong.");
      console.log(error?.message || "Something Went Wrong.");
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className='h-[93dvh] p-4 flex flex-col justify-center items-center w-full'>
        {
          !showOtpScreen ?
            <>
              <form className='flex flex-col gap-4 w-full' onSubmit={handleSignup}>
                <label htmlFor="">
                  <p>Name:</p>
                  <input onChange={(e) => setSigninFormInfo(prev => ({ ...prev, name: e.target.value }))} value={signinFormInfo?.name || ""} required name="name" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="text" />
                </label>
                <label htmlFor="">
                  <p>Email:</p>
                  <input onChange={(e) => setSigninFormInfo(prev => ({ ...prev, email: e.target.value }))} value={signinFormInfo?.email || ""} required name="email" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="email" />
                </label>

                <label htmlFor="">
                  <p>Password:</p>
                  <input onChange={(e) => setSigninFormInfo(prev => ({ ...prev, password: e.target.value }))} value={signinFormInfo?.password || ""} required name="password" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="password" />
                </label>

                <button disabled={isLoading} type='submit' className='p-3 bg-indigo-500 rounded-md text-white'>{isLoading ? "Signing Up..." : "Sign Up"}</button>
              </form>
              <p>Have an Account ? <span className='text-indigo-400'><Link to="/signin">Sign In</Link></span></p>
            </>
            :
            <form className='flex flex-col gap-4 w-full' onSubmit={handleOtpSubmit}>
              <label htmlFor="">
                <p>OTP : <span className='text-indigo-500'>({signinFormInfo?.email})</span> <span className='text-indigo-500' onClick={() => setShowOtpScreen(false)}>Change</span></p>
                <input onChange={(e) => setOtp(e.target.value)} value={otp || ""} name="otp" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="text" />
              </label>
              <button disabled={isLoading} type='submit' className='p-3 bg-indigo-500 rounded-md text-white'>{isLoading ? "Verifying..." : "Verify OTP"}</button>
            </form>
        }

      </div>
    </>
  )
}

export default Signup
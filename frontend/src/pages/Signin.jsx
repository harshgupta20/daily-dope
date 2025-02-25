import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import toastAlert from '../utils/alert';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Signin = () => {

    const [signinFormInfo, setSigninFormInfo] = useState({});
    const [otp, setOtp] = useState(null);
    const [showOtpScreen, setShowOtpScreen] = useState(false);

    const { setIsUserAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const handleSignup = async (event) => {
        try {
            event.preventDefault();
            setLoading(true);
            const email = event?.target?.email?.value;

            if (!email) {
                alert("Name/Email/Password is not eneterd correctly.");
            }

            const response = await axiosInstance.post("/auth/signup", signinFormInfo);

            if (response?.status === 200 && response?.data?.success) {
                toastAlert("info", "OTP Sent.");
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
                                    <p>Email:</p>
                                    <input onChange={(e) => setSigninFormInfo(prev => ({ ...prev, email: e.target.value }))} value={signinFormInfo?.email || ""} required name="email" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="email" />
                                </label>
                                <button disabled={isLoading} type='submit' className='p-3 bg-indigo-500 rounded-md text-white'>{isLoading ? "Sending OTP..." : "Send OTP"}</button>
                            </form>
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

export default Signin
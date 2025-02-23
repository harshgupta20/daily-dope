import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {

  const [signinFormInfo, setSigninFormInfo] = useState({});
  const [otp, setOtp] = useState(null);
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleSignup = (event) => {
    try {
      event.preventDefault();
      const name = event?.target?.name?.value;
      const email = event?.target?.email?.value;
      const password = event?.target?.password?.value;
      console.log(email, password);

      if (!name || !email || !password) {
        alert("Name/Email/Password is not eneterd correctly.");
      }

      console.log("signinFormInfo", signinFormInfo);

      setShowOtpScreen(true);
    }
    catch (error) {
      console.log(error?.message || "Something Went Wrong");
    }
  }

  const handleOtpSubmit = (event) => {
    try {
      event.preventDefault();
    }
    catch (error) {
      console.log(error?.message || "Something Went Wrong.");
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

                <button type='submit' className='p-3 bg-indigo-500 rounded-md text-white'>Sign In</button>
              </form>
              <p>Have an Account ? <span className='text-indigo-400'><Link to="/signin">Sign In</Link></span></p>
            </>
            :
            <form className='flex flex-col gap-4 w-full' onSubmit={handleOtpSubmit}>
              <label htmlFor="">
                <p>OTP : <span className='text-indigo-500'>({signinFormInfo?.email})</span> <span className='text-indigo-500' onClick={() => setShowOtpScreen(false)}>Change</span></p>
                <input onChange={(e) => setOtp(e.target.value)} value={otp || ""} name="otp" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="text" />
              </label>
              <button type='submit' className='p-3 bg-indigo-500 rounded-md text-white'>Verify OTP</button>
            </form>
        }

      </div>
    </>
  )
}

export default Signup
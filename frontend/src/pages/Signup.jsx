import React from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {

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
    }
    catch (error) {
      console.log(error?.message || "Something Went Wrong");
    }
  }

  const handleOtpSubmit = (event) => {
    try {
      event.preventDefault();
      console.log();
    }
    catch (error) {
      console.log(error?.message || "Something Went Wrong.");
    }
  }

  return (
    <>
      <div className='h-[93dvh] flex flex-col justify-center items-center w-full'>
        <form className='flex flex-col p-4 gap-4 w-full' onSubmit={handleSignup}>
          <label htmlFor="">
            <p>Name:</p>
            <input required name="name" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="text" />
          </label>
          <label htmlFor="">
            <p>Email:</p>
            <input required name="email" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="email" />
          </label>

          <label htmlFor="">
            <p>Password:</p>
            <input required name="password" className='w-full p-2 border-2 border-gray-400 rounded-md outline-none' type="password" />
          </label>

          <button type='submit' className='p-3 bg-indigo-500 rounded-md'>Sign In</button>
        </form>

        <p>Have an Account ? <span className='text-indigo-400'><Link to="/signin">Sign In</Link></span></p>

        {/* <form onSubmit={handleOtpSubmit}>
                      <label htmlFor="">
                        <p>OTP :</p>
                        <input type="text" />
                      </label>
                    </form> */}
      </div>
    </>
  )
}

export default Signup
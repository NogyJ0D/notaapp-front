import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore } from '../store/userStore.js'
import { useNavigate } from 'react-router-dom'
import { post } from '../api/index.js'

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState('');

  const onSubmit = async ({ email, password }) => {
    // TODO: Login a api

    const response = await post('/auth/login', { email, password })
    console.log(response)

    // const user = {
    //   id: 1,
    //   username: 'Pepe',
    //   firstname: 'Pepe',
    //   lastname: 'Argento',
    //   email: 'pepe@pepe.com',
    //   birthdate: '11-11-11',
    // }

    // if (user.id != null) {
    //   setUser(user);
    //   navigate('/notes')
    // }

  };

  const handleSignup = (e) => {
    navigate('/signup')

    console.log("Registro");
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='p-8 rounded w-80 bg-slate-400'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <p className='mb-4 text-2xl font-bold'>Login</p>
          <div>
            <label htmlFor='email' className='block mb-1'>Email</label>
            <input
              type='text'
              id='email'
              className={`w-full p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid email'
                },
                required: {
                  value: true,
                  message: 'Email required'
                }
              })}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor='password' className='block mb-1'>Password</label>
            <input
              type='password'
              id='password'
              className={`w-full p-2 rounded ${errors.password ? 'border-red-500' : ''}`}
              {...register('password', { required: { value: true, message: 'Password required'} })}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          {
            loginStatus &&
              <p className='text-xl font-bold text-red-500'>{loginStatus}</p>
          }
          <button type='submit' className='w-full py-2 text-white bg-blue-500 rounded'>
            Login
          </button>
          <button onClick={handleSignup} className='w-full py-2 text-white rounded bg-rose-400'>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

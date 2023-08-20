import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserStore } from '../store/userStore.js';
import { useNavigate } from 'react-router-dom';
import { post } from '../api/index.js'

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [registerStatus, setRegisterStatus] = useState('');

  const onSubmit = async (data) => {
    // TODO: registrar en la api

    const user = {
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      birthdate: data.birthdate,
      password: data.password
    }

    const response = await post('/auth/signup', user)

    if (response.status == 'error') {
      setRegisterStatus(response.data)
    }

    if (response.id != null) {
      setUser(response);
      navigate('/groups')
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='p-8 rounded w-80 bg-slate-400'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <p className='mb-4 text-2xl font-bold'>Register</p>
          <div>
            <label htmlFor='username' className='block mb-1'>Username</label>
            <input
              type='text'
              id='username'
              className={`w-full p-2 rounded ${errors.username ? 'border-red-500' : ''}`}
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
          </div>
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
              {...register('password', { required: { value: true, message: 'Password required' } })}
            />
            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor='firstname' className='block mb-1'>First Name</label>
            <input
              type='text'
              id='firstname'
              className={`w-full p-2 rounded ${errors.firstname ? 'border-red-500' : ''}`}
              {...register('firstname', { required: 'First Name is required' })}
            />
            {errors.firstname && <p className='text-red-500'>{errors.firstname.message}</p>}
          </div>
          <div>
            <label htmlFor='lastname' className='block mb-1'>Last Name</label>
            <input
              type='text'
              id='lastname'
              className={`w-full p-2 rounded ${errors.lastname ? 'border-red-500' : ''}`}
              {...register('lastname', { required: 'Last Name is required' })}
            />
            {errors.lastname && <p className='text-red-500'>{errors.lastname.message}</p>}
          </div>
          <div className=''>
            <label htmlFor='birthdate' className='block mb-1'>Birthdate</label>
            <input
              type='date'
              id='birthdate'
              className={`w-full p-2 rounded ${errors.birthdate ? 'border-red-500' : ''}`}
              {...register('birthdate', { required: 'Birthdate is required' })}
            />
            {errors.birthdate && <p className='text-red-500'>{errors.birthdate.message}</p>}
          </div>
          {
            registerStatus && <p className='text-xl font-bold text-red-500'>{registerStatus}</p>
          }
          <button type='submit' className='w-full py-2 text-white bg-blue-500 rounded'>
            Register
          </button>
          <button onClick={() => navigate('/login')} className='w-full py-2 text-white rounded bg-rose-400'>
            Go back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

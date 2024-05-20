import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../constantas/backendUrl';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${backendUrl}/auth`, {
                email: email,
                password: password
            });
            console.log(response.data)
            if (response.data) {
                localStorage.setItem("token", response.data);
                navigate("/admin");
            }
        } catch (error) {
            alert("Foydalanuvchi email yoki parol xato")
            console.log("Xatolik yuz berdi", error); 
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-green-400 p-4'>
            <div className='w-full max-w-sm p-8 shadow-2xl bg-white rounded-3xl'>
                <h1 className='text-2xl font-extrabold mb-6 text-center text-gray-700'>Login</h1>
                <div className='mb-6'>
                    <label htmlFor="email" className='block mb-2 text-gray-600 font-medium'>Email</label>
                    <input
                        type="text"
                        id='email'
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 shadow-sm'
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                </div>
                <div className='mb-6'>
                    <label htmlFor="password" className='block mb-2 text-gray-600 font-medium'>Password</label>
                    <input
                        type="password"
                        id='password'
                        className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 shadow-sm'
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
                <div className='text-center'>
                    <button
                        onClick={handleSubmit}
                        className='w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none'
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;

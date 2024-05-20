import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../constantas/backendUrl';

function Admin() {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        subtitle: "",
        description: "",
        rate: "",
        price: "",
        color: "",
        size: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        const { title, image, subtitle, description, rate, price, color } = formData;
        if (!title || !image || !subtitle || !description || !rate || !price || !color) {
            alert("Fill all the fields");
            return;
        }

        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem("token"),
            };
            const response = await axios.post(`${backendUrl}/products`, formData, { headers });
            if (response.data) {
                navigate("/");
            }
        } catch (error) {
            console.log("Error occurred:", error);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-gradient-to-r from-green-200 to-green-400 p-4'>
            <div className='w-full max-w-lg p-6 shadow-2xl bg-white rounded-3xl'>
                <h1 className='text-2xl font-extrabold mb-6 text-center text-gray-700'>Create Product Card</h1>
                <div className='grid grid-cols-1 gap-4'>
                    {Object.entries(formData).map(([key, value]) => (
                        <div key={key} className='mb-4'>
                            <label htmlFor={key} className='block mb-2 text-gray-600 font-medium'>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            <input
                                type={key === 'rate' || key === 'price' ? 'number' : 'text'}
                                id={key}
                                name={key}
                                value={value}
                                placeholder={`Enter ${key}`}
                                className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500 shadow-sm'
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
                <div className='mt-6'>
                    <button
                        onClick={handleSubmit}
                        className='w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:from-green-600 hover:to-green-700 focus:outline-none'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Admin;

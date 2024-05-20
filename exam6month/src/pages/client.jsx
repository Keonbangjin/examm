import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../constantas/backendUrl';
import { useNavigate, NavLink } from 'react-router-dom';

function Client() {
    const [categories, setCategories] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    useEffect(() => {
        async function getCategories() {
            try {
                const response = await axios.get(`${backendUrl}/products`);
                setCategories(response.data);
            } catch (err) {
                console.log("Error occurred", err);
            }
        }
        getCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`${backendUrl}/products/${id}`);
                setCategories(categories.filter(product => product.id !== id));
            } catch (err) {
                console.log("Error deleting product", err);
            }
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-r from-green-200 to-green-400 p-4'>
            <nav className='bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg mb-6 shadow-md'>
                <ul className='flex justify-center gap-10 text-white'>
                    <li>
                        <NavLink
                            to='/admin'
                            className='relative group text-lg font-semibold'
                        >
                            Admin
                            <span className='absolute left-0 bottom-0 w-full h-1 bg-white rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/login'
                            className='relative group text-lg font-semibold'
                        >
                            Login
                            <span className='absolute left-0 bottom-0 w-full h-1 bg-white rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className='flex flex-wrap gap-6 justify-center'>
                {categories.map(product => (
                    <div key={product.id} className='bg-white shadow-lg p-6 rounded-3xl hover:shadow-xl transition-shadow duration-300 w-full max-w-md'>
                        <img src={product.image} alt={product.title} className='w-full h-48 object-cover rounded-t-3xl' />
                        <div className='mt-4'>
                            <h2 className='text-2xl font-bold capitalize'>{product.title}</h2>
                            <h3 className='text-xl text-gray-800 mt-2'>{product.subtitle}</h3>
                            <p className='text-sm text-gray-500 mt-2'>{product.description}</p>
                            <div className='mt-4'>
                                <span className='block text-sm text-gray-700'>Rate: {product.rate} stars</span>
                                <span className='block text-lg font-bold mt-1'>{product.price} $</span>
                                <span className='block text-sm text-gray-700 mt-1'>Colors: {product.color}</span>
                                <span className='block text-sm text-gray-700 mt-1'>Size: {product.size}</span>
                            </div>
                            <button 
                                onClick={() => handleDelete(product.id)} 
                                className='mt-4 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-red-600 focus:outline-none'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Client;

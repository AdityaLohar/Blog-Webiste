import React from 'react'
import { Avatar } from './BlogCard';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='flex items-center justify-between px-4 border-b-2 py-3'>
            <div className='text-xl font-semibold cursor-pointer'>
                Medium
            </div>
            <div className='flex items-center gap-2 sm:gap-5'>
                <Link to={`/publish`}>
                    <button className='bg-green-700 text-white p-2 px-6 text-sm rounded-full'>New</button>
                </Link>
                <Avatar name="aditya" size={10} />
            </div>
        </div>
    )
}

export default Navbar
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import { Avatar } from './BlogCard';
import { Link } from 'react-router-dom';
import { userState } from './../atoms/userAtom';
import { useRecoilValue } from 'recoil';
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const username = useRecoilValue(userState)

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };
    return (
        <div className='flex items-center justify-between px-4 border-b-2 py-3' onClick={() => isModalOpen === true ? setIsModalOpen(false) : null}>
            <div className='text-xl font-semibold cursor-pointer'>
                <Link to={`/blogs`}>Medium</Link>
            </div>
            <div className='flex items-center gap-2 sm:gap-5'>
                <Link to={`/publish`}>
                    <button className='bg-green-700 text-white p-2 px-6 text-sm rounded-full'>New</button>
                </Link>
                <div>
                    <button onClick={() => isModalOpen === true ? setIsModalOpen(false) : setIsModalOpen(true)}>
                        <Avatar name={username ? username : "Anonymous"} size={10} />
                    </button>
                    {isModalOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-200 rounded-md shadow-lg z-10">
                            {/* <div className="py-2 px-4 cursor-pointer hover:bg-gray-100">
                                Change Profile Picture
                            </div> */}
                            <div
                                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
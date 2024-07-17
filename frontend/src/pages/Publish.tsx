import React, { ChangeEvent, useState } from 'react'
import Navbar from './../component/Navbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    
    const navigate = useNavigate()

    return (
        <div>
            <Navbar />
            <div className='flex justify-center w-full pt-8 px-4'>
                <div className='max-w-screen-lg w-full'>
                    <input
                        type="text"
                        className='bg-gray-100 w-full p-2.5 rounded-lg outline-none text-md'
                        placeholder='Title'
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <Textarea onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                    <button
                        className='bg-green-700 text-white text-sm p-3 rounded-lg'
                        onClick={async () => {
                            const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content: description
                            }, {
                                headers: {
                                    Authorization: localStorage.getItem('token')
                                }
                            })
                            navigate(`/blog/${res.data.id}`)
                        }}
                    >
                        Publish Blog
                    </button>
                </div>
            </div>
        </div>
    )
}

function Textarea({ onChange } : {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className='w-full mb-4 mt-2'>
        <textarea
            rows={4}
            className="block p-2.5 w-full text-md text-gray-900 bg-gray-100 rounded-lg outline-none"
            placeholder="Write your description here..."
            onChange={onChange}
        />
    </div>

}
export default Publish
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignupInput } from '@adityalohar/medium-common'
import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'

const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate()

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    })

    const handleReq = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`, postInputs)
            const jwt = res.data.jwt;
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        } catch (err) {
            alert("Error while signin up")
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h2 className='text-3xl font-bold py-5 text-center'>{type === "signup" ? "Create an" : "Login to "} account</h2>
            <div className='w-64 sm:w-80'>
                {type === "signup" ?
                    <LabelledInput label='Username' placeholder='Aditya Lohar' onChange={e => {
                        setPostInputs((c) => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} /> : null}

                <LabelledInput label='Email' type='email' placeholder='aditya@gmail.com' onChange={e => {
                    setPostInputs((c) => ({
                        ...c,
                        email: e.target.value
                    }))
                }} />
                <LabelledInput label='Password' type='password' placeholder='123456' onChange={e => {
                    setPostInputs((c) => ({
                        ...c,
                        password: e.target.value
                    }))
                }} />
                <button onClick={handleReq} className='mt-4 text-center bg-gray-900 text-white w-full p-2 rounded-lg'>{type === "signup" ? "Sign Up" : "Sign In"}</button>
            </div>
            <p className='p-2 text-gray-500'>{type === "signup" ? "Already" : "Dont"} have an account ?
                <Link to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? " Login" : " SignUp"}</Link>
            </p>
        </div>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, type, placeholder, onChange }: LabelledInputType) {
    return (
        <div className='py-1'>
            <p className='font-bold py-2'>{label}</p>
            <input type={type || "text"} placeholder={placeholder} onChange={onChange} className='w-full border border-1 border-gray-300 rounded-lg p-2' />
        </div>
    )
}

export default Auth
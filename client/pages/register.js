import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Logo from '../public/Logo.png'
import LogoString from '../public/LogoString.png'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { SyncOutlined } from '@ant-design/icons/SyncOutlined'

import { BsEye, BsEyeSlash } from "react-icons/bs";




const register = () => {


    const [firstName, setFirstName] = useState("นันฐวุฒิ");
    const [lastName, setLstName] = useState("ต้นสวรรค์"); { }
    const [username, setUserName] = useState("31280 ");
    const [password, setPassword] = useState("1234 ");
    const [Cpassword, setCpassword] = useState("1234");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
                firstName,
                lastName,
                username,
                password,
                Cpassword,
            });
            console.log("response data", data)
            toast.success('ลงทะเบียนสำเร็จ');
        } catch (err) {
            toast.error(err.response.data);
            console.log(err);
        }
    };

    return (
        <div>
            <div className="flex w-full h-screen">
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white">
                    <div className="columns-1 mb-28">
                        <Image
                            src={Logo}
                            alt=".."
                            width={500}
                        />

                        <Image
                            src={LogoString}
                            alt=".."
                            width={500}
                        />
                    </div>
                </div>


                <div className="w-full bg-blue-500 flex items-center justify-center lg:w-1/2">
                    <div className=' w-11/12 max-w-[700px] px-10 py-8 rounded-3xl bg-white border-2 border-gray-100'>
                        <h1 className='text-4xl text-center font-semibold'>ลงทะเบียน</h1>
                        <div>
                            <div className='mt-8'>
                                <div className='grid grid-cols-2 gap-2  mt-4'>
                                    <div className='flex flex-col '>
                                        <label className='text-lg font-medium'>ชื่อจริง</label>
                                        <input
                                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none  focus:border-blue-500'
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="กรอกชื่อจริง"
                                            required
                                        />
                                    </div>
                                    <div className='flex flex-col '>

                                        <label className='text-lg font-medium'>นามสกุล</label>
                                        <input
                                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none  focus:border-blue-500'
                                            value={lastName}
                                            onChange={(e) => setLstName(e.target.value)}
                                            placeholder="กรอกชื่อนามสกุล"
                                            required
                                        />
                                    </div>

                                </div>
                                <div className="flex flex-col mt-4">
                                    <label className="text-lg font-medium">อีเมล</label>
                                    <input
                                        className={`w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-blue-500`}
                                        value={username}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="กรอกอีเมล"
                                        required
                                    />
                                </div>

                                <div className='flex flex-col mt-4'>

                                    <label className='text-lg font-medium'>รหัสผ่าน</label>
                                    <div className="flex-1 relative">
                                        <input
                                            className={`w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none  focus:border-blue-500`}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                            }}
                                            placeholder="กรอกรหัสผ่าน"
                                            required
                                            type='password'
                                        />

                                    </div>
                                </div>
                                <div className='flex flex-col mt-4'>
                                    <label className='text-lg font-medium'>ยืนยันรหัสผ่าน</label>
                                    <div className="flex-1 relative">
                                        <input
                                            className={`w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none  focus:border-blue-500`}
                                            value={Cpassword}
                                            onChange={(e) => {
                                                setCpassword(e.target.value);
                                            }}
                                            placeholder="กรอกยืนยันรหัสผ่าน"
                                            required
                                            type={"password"}
                                        />

                                    </div>
                                </div>



                                <div className='mt-8 flex flex-col gap-y-4'>
                                    <button
                                    onClick={handleSubmit}
                                        className={`hover:shadow-form w-full rounded-md py-4 text-center text-base font-semibold outline-none flex items-center justify-center
                                                bg-blue-500 text-white`}
                                    >
                                        ลงทะเบียน
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>มีบัญชีแล้ว ?</p>
                            <Link href="/" >
                                <button
                                    type="submit"
                                    className='ml-2 font-medium text-base text-blue-500'>
                                    เข้าสู่ระบบ
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default register
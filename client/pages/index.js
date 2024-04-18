import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { SyncOutlined } from '@ant-design/icons/SyncOutlined'
import { Context } from '../context'


import Image from 'next/image'
import Logo from '../public/Logo.png'
import LogoString from '../public/LogoString.png'
import { useRouter } from 'next/router'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { FaUserGroup, FaUserTie } from "react-icons/fa6";
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { RiAdminFill, RiUserSettingsFill } from 'react-icons/ri'
import { HiOutlineUserGroup } from 'react-icons/hi'


const index = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // state
    const { state: { user },
        dispatch,
    } = useContext(Context);

    // router
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/login`,
                {
                    username,
                    password,
                }
            );

            dispatch({
                type: "LOGIN",
                user: data.payload.user,
            });

            // Save user in local storage
            window.localStorage.setItem("user", JSON.stringify(data.payload.user));
            window.localStorage.setItem("token", data.token);

            if (data.payload.user.role === 'teacher') {
                router.push('/teacher/home');
            } else if (data.payload.user.role === 'student') {
                router.push('/student/home');
            } else if (data.payload.user.role === 'admin') {
                router.push('/admin/home');
            }


        } catch (err) {
            setLoading(false); // Set loading state to false after error
            toast.error(err.response.data);
            console.log(err);
        } finally { // Ensure loading state returns to false even on errors
            setLoading(false);
        }
    };

    // const logUserLogin = async (userRole,firstName,lastName) => {
    //     try {
    //         // Send a request to your server-side endpoint to log the user login
    //         await axios.post(`${process.env.NEXT_PUBLIC_API}/course-logs`, {
    //             username,
    //             firstName,
    //             lastName,
    //             userType: userRole, 
    //             format: 'เข้าสู่ระบบ', 
    //         });
    //     } catch (error) {
    //         console.error('Error logging user login:', error);
    //     }
    // };


    return (
        <div className="flex w-full h-screen">
            <HeaderBar />
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white">
                <div className="flex flex-col space-y-8 lg:space-y-14 px-6 lg:px-20 xl:px-32">
                    <div className="flex items-center p-4 rounded-lg">
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 lg:h-20 w-16 lg:w-20 text-blue-600 bg-blue-100 rounded-full mr-4">
                            <FaUserGroup size={30} />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-xl lg:text-3xl font-semibold'>ครูและนักเรียน</p>
                            <p className='text-base lg:text-xl'>สำหรับครูและนักเรียนให้ลงชื่อเข้าใช้งานระบบ "ที่หน้าแรก" <br /> กรอกข้อมูล เลขประจำตัว และ รหัสผ่าน</p>
                        </div>
                    </div>
                    <div className="flex items-center p-4 rounded-lg">
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 lg:h-20 w-16 lg:w-20 text-blue-600 bg-blue-100 rounded-full mr-4">
                            <RiAdminFill size={30} />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-xl lg:text-3xl font-semibold'>แอดมิน</p>
                            <p className='text-base lg:text-xl'>สำหรับแอดมินให้ลงชื่อเข้าใช้งานระบบผ่านเมนู <br /> "สำหรับแอดมิน"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-blue-500 flex items-center justify-center lg:w-1/2">
            <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                    <h1 className='text-2xl lg:text-4xl text-center font-semibold'>เข้าสู่ระบบ</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='mt-6 lg:mt-8'>
                            <div className='flex flex-col'>
                                <label className='text-lg lg:text-xl font-medium'>เลขประจำตัว</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-3 lg:p-4 mt-1 bg-transparent focus:outline-none focus:border-blue-500'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="กรอกเลขประจำตัว"
                                    required
                                />
                            </div>
                            <div className='flex flex-col mt-4'>
                                <label className='text-lg lg:text-xl font-medium'>รหัสผ่าน</label>
                                <input
                                    className='w-full border-2 border-gray-100 rounded-xl p-3 lg:p-4 mt-1 bg-transparent focus:outline-none focus:border-blue-500'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="กรอกรหัสผ่าน"
                                    required
                                    type='password'
                                />
                            </div>
                            <div className='mt-8 flex flex-col gap-y-4'>
                                <Button size='lg' type="submit" color="primary" isLoading={loading}>
                                    {loading ? "กำลังโหลด..." : "เข้าสู่ระบบ"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default index

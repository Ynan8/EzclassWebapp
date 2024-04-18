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
import { FaUserTie } from "react-icons/fa6";
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { RiUserSettingsFill } from 'react-icons/ri'


const index = () => {
    const [email, setEmail] = useState("");
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
                `${process.env.NEXT_PUBLIC_API}/login-admin`,
                {
                    email,
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

            router.push('/admin/home');
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
        <div className="flex justify-center items-center h-screen">
            <div className="w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 px-4">
                <h1 className="text-4xl font-semibold text-center mb-8">สำหรับแอดมิน</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-4">
                        <label htmlFor="email" className="text-lg font-medium">อีเมล</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border-2 border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="กรอกอีเมล"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="text-lg font-medium">รหัสผ่าน</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border-2 border-gray-200 rounded-xl p-3 mt-1 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="กรอกรหัสผ่าน"
                            required
                        />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <Link href="/forgot-password">
                            <p className="text-blue-500 text-base font-medium">ลืมรหัสผ่าน ?</p>
                        </Link>
                        <Button type="submit" color="primary" size="lg" isLoading={loading}>
                            {loading ? "กำลังโหลด..." : "เข้าสู่ระบบ"}
                        </Button>
                    </div>
                    <div className="mt-4 flex justify-center items-center">
                        <Link href="/">
                            <p className="text-blue-500 text-base font-medium">กลับหน้าแรก</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default index

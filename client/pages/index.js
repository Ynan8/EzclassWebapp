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
import { Button } from "@nextui-org/react";

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


            // console.log("LOGIN Response", data.payload.user)
            // console.log("LOGIN Response", data.token)


            // // Save user in local storage
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




    return (
        <>
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
                    <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                        <h1 className='text-4xl text-center font-semibold'>เข้าสู่ระบบ</h1>
                        <form onSubmit={handleSubmit} >
                            <div className='mt-8'>
                                <div className='flex flex-col'>
                                    <label className='text-lg font-medium'>เลขประจำตัว</label>
                                    <input
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none  focus:border-blue-500'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="กรอกเลขประจำตัว"
                                        required
                                    />
                                </div>
                                <div className='flex flex-col mt-4'>
                                    <label className='text-lg font-medium'>รหัสผ่าน</label>
                                    <input
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none  focus:border-blue-500'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="กรอกรหัสผ่าน"
                                        required
                                        type='password'
                                    />
                                </div>
                                {/* <div className='mt-8 flex justify-between items-center'>
                                    <div>
                                    </div>
                                    <Link href="/forgot-password" >
                                        <div
                                            className='font-medium text-base text-blue-500'
                                        >ลืมรหัสผ่าน ?
                                        </div>
                                    </Link>
                                </div> */}
                                <div className='mt-8 flex flex-col gap-y-4 '>
                                    <Button size='lg' onClick={handleSubmit} color="primary" isLoading={loading} >
                                        {loading ? "กำลังโหลด..." : "เข้าสู่ระบบ"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default index

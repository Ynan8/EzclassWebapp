import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Context } from '../context';
import { useRouter } from "next/router";

import Image from 'next/image'
import forgotPassword from '../public/forgotPassword.png'
import { Button } from "@nextui-org/react";




const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState("");

    // context
    const { state: { user } } = useContext(Context)

    // router
    const router = useRouter()

    // redirect if user is logged in
    useEffect(() => {
        if (user !== null && user.role === 'teacher') {
            router.push('/teacher/home')
        } else if (user !== null && user.role === 'student') {
            router.push('/student/home')
        }
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/forgot-password`, { email });
            setSuccess(true)
            toast.success('ตรวจสอบรหัสจากอีเมล');
            setLoading(false)
        } catch (err) {
            setLoading(false)
            toast.error(err.response.data)
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        //  console.log( email,code,newPassword,);
        //  return ;
        try {
            setLoading(true)
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/reset-password`, {
                email,
                code,
                newPassword,
            });
            setEmail('');
            setCode('');
            setNewPassword('');
            setLoading(false);
            toast.success('รีเซ็ตรหัสผ่านสำเร็จ')
        } catch (err) {
            setLoading(false)
            toast.error(err.response.data)
        }
    }


    return (
        <>
            <div className="flex w-full h-screen">
                <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-white">
                    <div className="columns-1 mb-28">
                        <Image
                            src={forgotPassword}
                            alt=".."
                            width={500}
                        />
                    </div>
                </div>
                <div className="w-full bg-blue-500 flex items-center justify-center lg:w-1/2">
                    <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                        <h1 className='text-4xl text-center font-semibold'>ลืมรหัสผ่าน</h1>
                        <form onSubmit={success ? handleResetPassword : handleSubmit}>
                            <div className='mt-8'>
                                <div className='flex flex-col'>
                                    <label className='text-lg font-medium'>อีเมล</label>
                                    <input
                                        type="email"
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="กรอกอีเมล"
                                        required
                                    />
                                </div>
                                {success && <>
                                    <input
                                        type="text"
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="กรอกรหัสจากอีเมล"
                                        required
                                    />
                                    <input
                                        type="password"
                                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="กรอกรหัสผ่านใหม่"
                                        required
                                    />
                                </>}
                                <div className='mt-8 flex flex-col gap-y-4'>
                                    <Button
                                        isLoading={loading}
                                        type="submit"
                                        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg'

                                    >
                                        {loading ? "กำลังโหลด" : "รีเซ็ตรหัสผ่าน"}
                                    </Button>
                                </div>
                                <div className='mt-8 flex justify-center items-center'>
                                    <Link href="/adminLogin" >
                                        <button
                                            className='ml-2 font-medium text-base text-blue-500'>กลับหน้าสำหรับแอดมิน
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </>
    )


}

export default ForgotPassword;
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../public/Logo2.png';


import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Context } from '../../context';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import axios from 'axios';



const HeaderBarTeacher = () => {

    // state
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);

    const { state: { user },
        dispatch,
    } = useContext(Context);

    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUser();
    }, [user])

    const getUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['authtoken'] = token;
            }
            if (user && user._id) {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/user/${user._id}`);
                setUserData(data);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };



    // router
    const router = useRouter();



    const logout = async () => {
        setLoading(true);
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem('token');
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/logout`);
        setLoading(false);

        toast.promise(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 1000);
            }),
            {
                loading: "กำลังออกจากระบบ...",
                success: "ออกจากระบบสำเร็จ",
                error: "ไม่สามารถออกจากระบบได้"
            }
        ).then(() => {
            router.push('/');
        });
    };


    return (
        <div>

            <header className="header bg-white shadow pr-4 fixed top-0 left-0 w-full z-10">
                <div className="header-content flex ">
                    <Link href={'/student/home'}>
                        <div className="flex justify-center item-center">
                            <div className="Logo">
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    width={60}
                                    height={20}
                                />
                            </div>
                            <div className="flex justify-center items-center space-x-10">
                                <p className="hidden md:block text-3xl font-medium text-blue-500">EZCLASS</p>
                                {/* <SearchCourse setSearch={setSearch} /> */}
                            </div>
                        </div>
                    </Link>
                    <div className="flex gap-x-2 ml-auto">
                        <div className="flex items-center gap-4">

                            <Dropdown placement="bottom-start">
                                <DropdownTrigger>
                                    <User
                                        as="button"
                                        avatarProps={{
                                            isBordered: true,
                                            src: userData.image ? userData.image.Location : '/profile.png'
                                        }}
                                        className="uppercase transition-transform"
                                        description={userData?.role}
                                        name={`${userData?.firstName} ${userData?.lastName}`}
                                    />

                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">

                                    <DropdownItem
                                        key="settings"
                                    >
                                        <Link href={'/student/editProfile'}>
                                            <p>แก้ไขโปรไฟล์</p>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        color="danger"
                                        onClick={logout}
                                    >
                                        ออกจากระบบ
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HeaderBarTeacher
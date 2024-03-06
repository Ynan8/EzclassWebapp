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



const HeaderBarStd = () => {

    // state
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);

    const { state: { user },
        dispatch,
    } = useContext(Context);



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
                    <Link href={'/teacher/home'}>
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
                                            src: user && user.image,
                                        }}
                                        className="transition-transform"
                                        description={user && user.role}
                                        name={user && user.firstName + ' ' + user && user.lastName}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">

                                    <DropdownItem
                                        key="settings"
                                    >
                                        แก้ไขโปรไฟล์
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

export default HeaderBarStd
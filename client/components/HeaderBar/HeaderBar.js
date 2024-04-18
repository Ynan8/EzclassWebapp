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
import { AiOutlineMenu } from 'react-icons/ai';
import { LuUser2 } from "react-icons/lu";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, } from "@nextui-org/react";
import { RiUserSettingsFill, RiUserSettingsLine } from "react-icons/ri";


const HeaderBarTeacher = ({
    handleSidebarToggle,
}) => {


    // router
    const router = useRouter();


    return (
        <header className="header bg-white shadow pr-4 h-16 fixed top-0 left-0 w-full z-10">
        <div className="header-content flex items-center justify-between">
            <Link href='/'>
                <div className="flex items-center">
                    <div className="Logo">
                        <Image
                            src={Logo}
                            alt="Logo"
                            width={60}
                            height={20}
                        />
                    </div>
                    <p className="text-3xl font-medium text-blue-500 ml-2">EZCLASS</p>
                </div>
            </Link>
            <div className="flex items-center gap-4">
                <Navbar classNames={{ item: "flex relative items-center" }}>
                    <NavbarContent className="flex gap-10 justify-center">
                        <NavbarItem>
                            <Link href='/adminLogin'>
                                <Button
                                    className='text-lg'
                                    size='lg'
                                    startContent={<RiUserSettingsFill size={25} />}
                                    color="primary"
                                    variant="flat"
                                >
                                    สำหรับแอดมิน
                                </Button>
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </div>
        </div>
    </header>
    )
}

export default HeaderBarTeacher
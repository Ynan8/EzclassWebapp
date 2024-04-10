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
        <div>
            <header className="header bg-white shadow pr-4 h-16 fixed top-0 left-0 w-full z-10">
                <div className="header-content flex ">
                    <Link href='/'>
                        <div className="flex justify-center item-center">
                            <div className=" Logo">
                                <Image
                                    src={Logo}
                                    alt="Logo"
                                    width={60}
                                    height={20}
                                />
                            </div>
                            <div
                                className="flex justify-center items-center ml-2">
                                <p className="hidden md:block text-3xl font-medium justify-center items-center text-blue-500">EZCLASS</p>
                            </div>

                        </div>
                    </Link>
                    <div className="flex gap-x-2 ml-auto">
                        <div className="flex items-center gap-4">

                            <Navbar
                                classNames={{
                                    item: [
                                        "flex",
                                        "relative",
                                        "items-center",
                                        "data-[active=true]:after:content-['']",
                                        "data-[active=true]:after:absolute",
                                        "data-[active=true]:after:bottom-0",
                                        "data-[active=true]:after:left-0",
                                        "data-[active=true]:after:right-0",
                                        "data-[active=true]:after:h-[2px]",
                                        "data-[active=true]:after:rounded-[2px]",
                                        "data-[active=true]:after:bg-primary",
                                    ],
                                }}
                            >
                                <NavbarContent className="flex gap-10" justify="center">
                                    <NavbarItem
                                    >
                                        <Link
                                            href='/adminLogin'
                                        >
                                            <Button
                                                className='text-lg'
                                                size='lg'
                                                startContent={
                                                    <RiUserSettingsFill size={25} />
                                                }
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
                </div>
            </header>
        </div>
    )
}

export default HeaderBarTeacher
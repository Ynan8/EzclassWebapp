import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../public/Logo2.png';


import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User } from "@nextui-org/react";
import { Button } from "@nextui-org/button";



const HeaderBarTeacher = () => {

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
                                    width={80}
                                    height={30}
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
                                            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                                        }}
                                        className="transition-transform"
                                        description="@tonyreichert"
                                        name="Tony Reichert"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-bold">Signed in as</p>
                                        <p className="font-bold">@tonyreichert</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">
                                        My Settings
                                    </DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">
                                        Analytics
                                    </DropdownItem>
                                    <DropdownItem key="system">System</DropdownItem>
                                    <DropdownItem key="configurations">Configurations</DropdownItem>
                                    <DropdownItem key="help_and_feedback">
                                        Help & Feedback
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
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
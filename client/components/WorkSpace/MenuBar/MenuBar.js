import { Tabs, Tab, Button } from '@nextui-org/react';
import React from 'react';
import { FaUsers } from 'react-icons/fa';
import Client from '../Client';

const MenuBar = ({
    clients,
    language,
    setLanguage,
    theme,
    setTheme,
    fontSize,
    setFontSize,
}) => {
    return (
        <div className='vh-100 bg-[#282827]'>
            <div className='flex flex-col px-0  h-[100vh] overflow-y-auto'>

                <Tabs
                    size='md'
                    className='flex justify-center mt-4'
                    aria-label="Options"
                    color="primary"
                    variant="bordered" >
                    <Tab
                        key="user"
                        title={
                            <div className="flex items-center space-x-2">
                                <FaUsers />
                                <span>ผู้เข้าร่วม</span>
                            </div>
                        }
                    >
                        <div className=" text-lg mt-4 text-white">ผู้เข้าร่วม {clients.length} คน</div>
                        <div className="grid grid-cols-2 gap-4 my-4">
                            {clients.map((client) => (
                                <Client key={client.socketId} firstName={client.firstName} />
                            ))}
                        </div>
                    </Tab>

                    <Tab
                        key="setting"
                        title={
                            <div className="flex items-center space-x-2">
                                {/* <GalleryIcon /> */}
                                <span>ตั้งค่า</span>
                            </div>
                        }
                    >
                        <div className="flex flex-col space-y-6 p-2 text-white">
                            <div className="flex flex-col">
                                <label className='text-lg mb-2' >เลือกภาษา</label>
                                <select
                                    value={language} onChange={(e) => setLanguage(e.target.value)}
                                    className="flex border-2 border-white cursor-pointer items-center rounded focus:outline-none bg-[#282827] text-white w-full px-2 py-2 font-medium"
                                >
                                    <option value="python">Python</option>
                                    <option value="javascript">JavaScript</option>
                                    {/* Add more languages as needed */}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className='text-lg mb-2'>เลือกขนาดตัวอักษร</label>
                                <select
                                    value={fontSize} onChange={(e) => setFontSize(e.target.value)}
                                    className="flex border-2 border-white cursor-pointer items-center rounded focus:outline-none bg-[#282827] text-white w-full px-2 py-2 font-medium"
                                >
                                    <option value="12">12 px</option>
                                    <option value="14">14 px</option>
                                    <option value="16">16 px</option>
                                    <option value="18">18 px</option>
                                    <option value="20">20 px</option>
                                    {/* Add more font sizes as needed */}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className='text-lg mb-2' >เลือกธีม</label>
                                <select
                                    className="flex border-2 border-white  cursor-pointer items-center rounded focus:outline-none bg-[#282827] text-white w-full px-2 py-2 font-medium"
                                    value={theme} onChange={(e) => setTheme(e.target.value)}
                                >
                                    <option value="vs-dark">Dark</option>
                                    <option value="light">Light</option>
                                    {/* Add more themes as needed */}
                                </select>
                            </div>
                        </div>
                    </Tab>
                </Tabs>

                <div className="flex items-center justify-center mt-auto mb-10">
                    <Button
                        size="md"
                        className='px-24 '
                        color="danger"
                        variant="shadow">
                        Leave
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default MenuBar;

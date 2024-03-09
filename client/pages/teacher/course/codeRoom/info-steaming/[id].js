import React from 'react'
import SideBarTeacher from '../../../../../components/Sidebar/SideBarTeacher'
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher'
import Image from 'next/image';
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, CardHeader, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Listbox, ListboxItem, ListboxSection } from '@nextui-org/react'
import { useRouter } from 'next/router';
import { MdContentCopy } from 'react-icons/md';



const InfoStreaming = () => {
    const router = useRouter();
    const { id } = router.query;

    const serverURL = 'rtmps://live-api-s.edututs+:443/rtmp/';
    const streamKey = '592030151361629?s_bl=1&s_ps=1&s_sw=0&s_vt=api-s&a=AabZX7ykX7dnKpBf';

    // Functions to copy the URLs to clipboard
    const copyToClipboard = (text) => () => {
        navigator.clipboard.writeText(text).then(() => {
            // Handle successful copy
            console.log('Copied to clipboard');
        }).catch(err => {
            // Handle error
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarTeacher courseYearId={id} />
                <HeaderBarTeacher />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>ไพทอนพื้นฐาน</BreadcrumbItem>
                            <BreadcrumbItem>ปีการศึกษา 2567</BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียนเขียนโค้ด</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <div className="px-12 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            <div className="flex items-center justify-center mt-28">
                                <div className="w-full max-w-2xl p-6 bg-white rounded-md shadow-md">
                                    <h2 className="text-xl font-semibold mb-4">ห้องเรียนเขียนโค้ดออนไลน์</h2>
                                    <p className="text-lg mb-4">
                                    <span className='text-gray-800 font-semibold'>ชื่อโจทย์</span> Print("Hello")
                                    </p>    
                                    <div className="mb-4">
                                        <label htmlFor="serverURL" className="block font-medium text-gray-700">ลิงก์ห้องเรียน*</label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <input type="text" id="serverURL" value={serverURL} className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300" readOnly />
                                            <button onClick={copyToClipboard(serverURL)} className="inline-flex items-center p-2 border border-transparent rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                                {/* <ClipboardCopyIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                <MdContentCopy />
                                            </button>
                                        </div>
                                    </div>



                                    <div className="mt-6">
                                        <button type="button" className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            เริ่มสอน
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default InfoStreaming
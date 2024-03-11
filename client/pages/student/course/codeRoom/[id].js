import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai';
import { BiCodeAlt } from 'react-icons/bi';
import SideBarStudent from '../../../../components/Sidebar/SideBarStudent';
import HeaderBarStd from '../../../../components/HeaderBar/HeaderBarStd';
import { Context } from '../../../../context';
import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/react';
import { RiCodeBoxFill } from 'react-icons/ri';

const CodeRoomStudent = () => {
    // Load course 
    const [course, setCourse] = useState({});

    const router = useRouter();
    const { id } = router.query;

    const { state: { user }, dispatch } = useContext(Context);
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        if (user && user.firstName) {
            setFirstName(user.firstName);
        }
    }, [user]);

    const handleStartLearning = (roomId) => () => {
        router.push({
            pathname: `/editor/${roomId}`,
            query: { firstName },
        });
    };

    useEffect(() => {
        if (id) {
            loadCourse();
            loadCourseYearId();
        }
    }, [id]);


    const loadCourse = async () => {
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${id}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }

    // Get course Year Id
    const [courseYearId, setCourseYearId] = useState()
    const loadCourseYearId = async () => {
        if (id) {

            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std/getCourseYearId/${id}`);
                setCourseYearId(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }
    useEffect(() => {
        if (courseYearId) {
            loadCodeRoom();
        }
    }, [courseYearId]);

    
    // Show CodeRoom
    const [codeRoom, setCodeRoom] = useState([])


    const loadCodeRoom = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
              axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/codeRoom`, {
                params: {
                    courseYearId: courseYearId,
                },
            });
            setCodeRoom(data)
        } catch (error) {
            console.error('Error loading sections:', error);
        }
    }





    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarStudent id={id} />
                <HeaderBarStd />
                <div className="h-full ml-14 mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        <nav className="text-gray-500" aria-label="Breadcrumb">
                            <ol className="list-none p-0 inline-flex">
                                <li className="flex items-center">
                                    <a href="#">หน้าหลัก</a>
                                    <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" /></svg>
                                </li>
                                <li>
                                    <a href="#" className=" text-blue-500 font-bold" aria-current="page">ห้องเรียนเขียนโค้ด</a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="px-12 pt-8 w-full">
                        <div className="px-[40px] flex flex-col item-center justify-center">
                            {/* <pre>{JSON.stringify(codeRoom, null, 4)}</pre> */}
                            <Listbox variant="flat" aria-label="Listbox menu with sections">
                                <ListboxSection title="ห้องเรียนเขียนโค้ด" showDivider>
                                    {codeRoom && codeRoom.map(codeRoom => (
                                        <ListboxItem
                                            className='mb-2 p-3'
                                            key="delete"
                                            title={
                                                <div
                                                    onClick={handleStartLearning(codeRoom._id)}
                                                    className='flex items-center text-lg' >
                                                    <p>
                                                        <span className='font-semibold' >{codeRoom.codeRoomName}</span>
                                                    </p>
                                                 
                                                </div>
                                            }
                                            startContent={
                                                <div className="bg-secondary/10 text-secondary p-2 rounded-md">
                                                    <RiCodeBoxFill size={25} className="text-secondary" />
                                                </div>
                                            }

                                        >
                                        </ListboxItem>
                                    ))}
                                </ListboxSection>
                            </Listbox>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CodeRoomStudent
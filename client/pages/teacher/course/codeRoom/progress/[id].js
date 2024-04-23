import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Breadcrumbs, BreadcrumbItem, Chip, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import Link from 'next/link';
import { AiOutlineArrowLeft, AiOutlineLeft } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { IoCalendarClearOutline } from 'react-icons/io5';
import axios from 'axios';



const ProgressCodeRoom = () => {
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const { id, courseYear } = router.query;

    const [stdSubmitCodeCourse, setStdSubmitCodeCourse] = useState([]);

    useEffect(() => {
        if (id) {
            loadStdSubmitCodeCourse();
        }
    }, [id]);

    const loadStdSubmitCodeCourse = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/std-submitCodeCourse/${id}`);
            setStdSubmitCodeCourse(data);
            console.log("Loading student submit code all", data);
        } catch (error) {
            console.error("Error loading course:", error);
        } finally {
        }
    };

    // Ensure that stdSubmitCodeCourse is an array before sorting
    const sortedData = Array.isArray(stdSubmitCodeCourse) ? stdSubmitCodeCourse.sort((a, b) => {
        if (a.score !== b.score) {
            return b.score - a.score; // Sort by number of questions passed
        } else {
            // If the number of questions passed is the same, sort by timestamp
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
    }) : [];


    // Show Course Room
    const [courseRoom, setCourseRoom] = useState([])

    useEffect(() => {
        if (courseYear) {
            loadCourseRoom()

        }
    }, [courseYear])

    const loadCourseRoom = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoom/${courseYear}`);
            setCourseRoom(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    // Search state for name and roomName
    const [nameFilter, setNameFilter] = useState("");
    const [roomNameFilter, setRoomNameFilter] = useState([]);

    const [codeRoom, setCodeRoom] = useState([]);

    const loadCodeRoom = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/codeRoom`, {
                params: {
                    courseYearId: courseYear,
                },
            });
            setCodeRoom(data)
            console.log(data)
        } catch (error) {
            console.error('Error loading sections:', error);
        } finally {
            setIsLoading(false);  // Set loading to false after fetching data
        }
    };

    useEffect(() => {
        if (courseYear) {
            loadCodeRoom();
        }
    }, [courseYear]);


    return (
        <div>
            <HeaderBarTeacher />
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <Link href={`/teacher/course/codeRoom/${courseYear}`}>
                    <div className="flex item-center space-x-2 p-2 mt-20 ml-4 w-28">
                        <AiOutlineLeft size={30} />
                        <p>ย้อนกลับ</p>
                    </div>
                </Link>
                <main className="flex-1 pb-16  sm:pb-32">
                    <div className="mx-auto max-w-screen-2xl  px-4 sm:px-6 xl:px-12">
                        <p className='text-2xl font-semibold mb-4'>ความคืบหน้าห้องเรียน</p>
                        <div className="bg-white rounded  md:py-2 px-4 md:px-8 xl:px-10">
                            <div className="flex items-center space-x-2 py-4">
                                <Input
                                    size='sm'
                                    isClearable
                                    className="w-full sm:max-w-[44%]"
                                    placeholder="ค้นหาชื่อ-สกุล..."
                                    startContent={<BiSearch />}
                                    value={nameFilter}
                                    onChange={(e) => setNameFilter(e.target.value)}
                                />
                                {/* <Dropdown>
                                    <DropdownTrigger className="hidden sm:flex">
                                        <Button size='lg' endContent={<BiChevronDown className="text-sm" />} variant="flat">
                                            ค้นหาชื่อห้องเรียน
                                        </Button>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        disallowEmptySelection
                                        aria-label="Room Names Dropdown"
                                        closeOnSelect={false}
                                        selectionMode="multiple"
                                        onChange={(selectedItems) => setRoomNameFilter(selectedItems)}
                                    >
                                        {courseRoom.map((room, index) => (
                                            <DropdownItem key={index} className="capitalize">
                                                {room.roomName}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown> */}
                            </div>
                            <Table aria-label="Example static collection table">
                                <TableHeader>
                                    <TableColumn className='text-lg'>อันดับ</TableColumn>
                                    <TableColumn className='text-lg'>ชื่อ - สกุล</TableColumn>
                                    <TableColumn className='text-lg'>ชื่อห้องเรียน</TableColumn>
                                    <TableColumn className='text-lg'>จำนวนข้อที่ผ่าน(จากทั้งหมด {codeRoom.length} ข้อ)</TableColumn>
                                </TableHeader>
                                {sortedData.filter(item =>
                                    item.studentId.firstName.toLowerCase().includes(nameFilter.toLowerCase()) &&
                                    (roomNameFilter.length === 0 || roomNameFilter.includes(item.codeRoomId.codeRoomName))
                                ).length > 0 ? (
                                    <TableBody>
                                        {sortedData.filter(item =>
                                            item.studentId.firstName.toLowerCase().includes(nameFilter.toLowerCase()) &&
                                            (roomNameFilter.length === 0 || roomNameFilter.includes(item.codeRoomId.codeRoomName))
                                        ).reduce((acc, item) => {
                                            const matchedCourseRoom = courseRoom.find(room => room.studentId.includes(item.studentId._id));
                                            const existingIndex = acc.findIndex(student => student.firstName === item.studentId.firstName && student.lastName === item.studentId.lastName);
                                            if (existingIndex !== -1) {
                                                acc[existingIndex].score += item.score;
                                            } else {
                                                acc.push({
                                                    firstName: item.studentId.firstName,
                                                    lastName: item.studentId.lastName,
                                                    roomName: matchedCourseRoom ? matchedCourseRoom.roomName : "",
                                                    score: item.score
                                                });
                                            }
                                            return acc;
                                        }, []).map((student, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-lg">{index + 1}</TableCell>
                                                <TableCell className="text-lg">{student.firstName} {student.lastName}</TableCell>
                                                <TableCell className="text-lg">{student.roomName}</TableCell>
                                                <TableCell className="text-lg">
                                                    <Chip
                                                        startContent={<FaCheckCircle size={20} />}
                                                        color='success'
                                                        variant='flat'
                                                        size='lg'
                                                    >
                                                        ผ่านแล้ว <span className='font-semibold'>{student.score}</span>
                                                    </Chip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                ) : (
                                    <TableBody emptyContent={"ยังไม่มีความคืบหน้าห้องเรียน"}>{[]}</TableBody>
                                )}
                            </Table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ProgressCodeRoom;

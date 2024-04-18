import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher';
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher';
import { BreadcrumbItem, Breadcrumbs, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Pagination } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from 'axios';
import Link from 'next/link'
import moment from "moment/min/moment-with-locales";
import { BiChevronDown, BiSearch } from 'react-icons/bi';
import { IoCalendarClearOutline } from "react-icons/io5";


const CourseLogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isCourseLoading, setIsCourseLoading] = useState(true);

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };
    const router = useRouter();
    const { id } = router.query;

    // Show Course Year
    const [courseYear, setCourseYear] = useState({});

    useEffect(() => {
        if (id) {
            loadCourseYear();
        }
    }, [id]);

    const loadCourseYear = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${id}`);
            const firstElement = data && data.length > 0 ? data[0] : {};
            setCourseYear(firstElement);

        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };
    const courseId = courseYear.courseId;

    const [course, setCourse] = useState({});


    useEffect(() => {
        if (id) {
            loadCourse();
        }
    }, [courseId]);


    const loadCourse = async () => {
        setIsCourseLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
            setCourse(data);
        } catch (error) {
            console.error("Error loading course:", error);
        } finally {
            setIsCourseLoading(false);
        }
    };

    // Show Course Logs
    const [courseLogs, setCourseLogs] = useState([])
    useEffect(() => {
        loadCourseLogs()
    }, [courseId])

    const loadCourseLogs = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course-logs/${courseId}`);
            setCourseLogs(data);
            console.log("course logs data ", data);
        } catch (error) {
            console.error('Error loading courses logs:', error);
        } finally {
            setIsLoading(false);
        }
    }


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(courseLogs.length / itemsPerPage);

    // State for filtered logs
    const [filteredLogs, setFilteredLogs] = useState([]);

    // State for filter values
    const [nameFilter, setNameFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    const [userTypeFilter, setUserTypeFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");


    // Function to filter logs
    const filterLogs = () => {
        let filtered = courseLogs;

        // Filter by name
        if (nameFilter) {
            filtered = filtered.filter(log => log.firstName.toLowerCase().includes(nameFilter.toLowerCase()) || log.lastName.toLowerCase().includes(nameFilter.toLowerCase()));
        }

        // Filter by userType
        if (userTypeFilter && userTypeFilter.length > 0) {
            filtered = filtered.filter(log => userTypeFilter.includes(log.userType.toLowerCase()));
        }

        // Filter by date
        if (dateFilter) {
            filtered = filtered.filter(log => moment(log.createdAt).format("YYYY-MM-DD") === dateFilter);
        }

        setFilteredLogs(filtered);
    };

    // Call filterLogs whenever filters change
    useEffect(() => {
        filterLogs();
    }, [nameFilter, roleFilter, dateFilter, courseLogs]);


    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <SideBarTeacher mobileSidebarOpen={mobileSidebarOpen} courseYearId={id} />
                <HeaderBarTeacher handleSidebarToggle={toggleSidebar} />
                <div className="h-full  mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>
                                <Link href='/teacher/home' >
                                    <p>หน้าหลัก</p>
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href='/teacher/home' >
                                    {course.courseName} ม.{course.level}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link href={`/teacher/course/year/${course._id}`}>
                                    ปีการศึกษา {courseYear.year}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>การเข้าใช้งาน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                    <main className="flex-1 mt-10 pb-16 sm:pb-32">
                        <div className="mx-auto max-w-screen-3xl  px-4 sm:px-6 xl:px-12">
                            <p className='text-2xl font-semibold mb-4'>ประวัติเข้าใช้งานรายวิชา</p>
                            <div className="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                                <div className="flex items-center space-x-2 py-4">
                                    <Input
                                        size='sm'
                                        isClearable
                                        className="w-full sm:max-w-[44%]"
                                        placeholder="ค้นหาชื่อ-สกุล..."
                                        startContent={<BiSearch />}
                                        onChange={(e) => setNameFilter(e.target.value)}
                                    />
                                    {/* <Dropdown>
                                        <DropdownTrigger className="hidden sm:flex">
                                            <Button size='lg' endContent={<BiChevronDown className="text-sm" />} variant="flat">
                                                ค้นหาประเภทผู้ใช้งาน
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="Table Columns"
                                            closeOnSelect={false}
                                            selectionMode="multiple"
                                            onChange={(selectedIndexes) => {
                                                const selectedItems = selectedIndexes.map(index => {
                                                    return index === 0 ? "STUDENT" : "TEACHER"; // Assuming the index corresponds to the item's position in the DropdownItem list
                                                });
                                                setUserTypeFilter(selectedItems);
                                            }}
                                        >
                                            <DropdownItem className="capitalize">
                                                STUDENT
                                            </DropdownItem>
                                            <DropdownItem className="capitalize">
                                                TEACHER
                                            </DropdownItem>
                                        </DropdownMenu>
                                </Dropdown> */}
                                    <Input
                                        size='sm'
                                        type='date'
                                        isClearable
                                        className="w-full sm:max-w-[44%]"
                                        placeholder="ค้นหาวันที่..."
                                        startContent={<BiSearch />}
                                        onChange={(e) => setDateFilter(e.target.value)}
                                    />

                                </div>
                                <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
                                    {/* <pre>{JSON.stringify(courseLogs, null, 4)}</pre> */}
                                    <Table aria-label="Course Logs Table">
                                        <TableHeader className="text-2xl">
                                            <TableColumn><p className='text-lg'>วัน/เวลา</p></TableColumn>
                                            <TableColumn><p className='text-lg'>ชื่อผู้ใช้งาน</p></TableColumn>
                                            <TableColumn><p className='text-lg'>ชื่อ - สกุล</p></TableColumn>
                                            <TableColumn><p className='text-lg'>รูปแบบ</p></TableColumn>
                                            <TableColumn><p className='text-lg'>จาก IP</p></TableColumn>
                                            <TableColumn><p className='text-lg'>หมายเหตุ</p></TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredLogs
                                                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                                .map(log => (
                                                    <TableRow key={log._id}>
                                                        <TableCell className='text-lg'>
                                                            {moment(log.createdAt)
                                                                .locale('th')
                                                                .format('LL HH:mm')}
                                                        </TableCell>
                                                        <TableCell className='text-lg'>{log.username}</TableCell>
                                                        <TableCell className='text-lg'>{`${log.firstName} ${log.lastName}`}</TableCell>
                                                        <TableCell className='text-lg'>{log.format} {course.courseName}</TableCell>
                                                        <TableCell className='text-lg'>{log.ipAddress}</TableCell>
                                                        <TableCell className='text-lg'>{log.note}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                        <TableBody emptyContent="ไม่มีประวัติการเข้าใช้งานรายวิชา" />
                                    </Table>

                                </div>
                                <div className="flex justify-center mt-2">
                                    <Pagination
                                        size='lg'
                                        total={totalPages}
                                        initialPage={1}
                                        page={currentPage}
                                        onChange={(page) => setCurrentPage(page)}
                                    />
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div >
        </div >
    )
}

export default CourseLogs
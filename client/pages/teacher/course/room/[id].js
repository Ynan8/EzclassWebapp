import React, { useEffect, useState } from 'react'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input, ModalHeader, ModalBody, ModalFooter, Skeleton } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import { FaPlus } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { CiEdit, CiSearch } from "react-icons/ci";
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher';
import { useRouter } from 'next/router';
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import AddCourseRoom from '../../../../components/Modals/AddCourseRoom';
import axios from 'axios';
import UpdateCourseRoom from '../../../../components/Modals/UpdateCourseRoom';
import toast from 'react-hot-toast';
import Link from 'next/link';



const CourseRoom = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setMobileSidebarOpen(!mobileSidebarOpen);
    };

    const router = useRouter();
    const { id } = router.query;

    const { isOpen: isOpenModalCreate, onOpen: onOpenModalCreate, onOpenChange: onOpenChangeModalCreate } = useDisclosure();
    const { isOpen: isOpenModalUpdate, onOpen: onOpenModalUpdate, onOpenChange: onOpenChangeModalUpdate } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onOpenChange: onOpenChangeModalDelete } = useDisclosure();

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
            // Select the first element from the array (if it exists)
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
        if (id) {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${courseId}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            }
        }
    }


    // Show Course Room
    const [courseRoom, setCourseRoom] = useState([])


    useEffect(() => {
        loadCourseRoom()
    }, [id])

    const loadCourseRoom = async () => {
        setIsLoading(true); // Start loading
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoom/${id}`);
            setCourseRoom(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };


    // Update Room
    const [currentRoom, setCurrentRoom] = useState({});

   

    // Delete Room
    const [roomId, setRoomId] = useState("");

    const openDeleteModal = (id) => {
        setRoomId(id);
        onOpenModalDelete();
    };

    const handleDeleteRoom = async (roomId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-courseRoom/${roomId}`);

            toast.success('ลบห้องเรียนสำเร็จ');
            loadCourseRoom();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบห้องเรียนได้ ลองอีกครั้ง!!');
        }
    };

    const columns = [
        { name: "ลำดับ", uid: "index" },
        { name: "ชื่อห้อง", uid: "roomName" },
        { name: "จำนวนนักเรียน", uid: "student" },
        { name: "ดูห้องเรียน", uid: "roomDetail" },
        { name: "จัดการ", uid: "actions" },
    ];

    const renderCell = React.useCallback((courseRoom, columnKey, index, course) => {
        const cellValue = courseRoom[columnKey];

        switch (columnKey) {
            case "index":
                return (
                    <div className="">
                        {index}
                    </div>
                );
            case "roomName":
                return (
                    <div className="flex flex-col">
                        <p className="text-lg  ">{`ม.${course.level}/${courseRoom.roomName}`}</p>
                    </div>
                );
            case "student":
                return (
                    <div className="flex flex-col">
                        <p className="text-lg">{courseRoom.studentId.length} คน</p>
                    </div>
                );
            case "status":
                return (
                    <Tooltip content="ดูห้องเรียน">
                        <Link
                            href={`/teacher/course/room/single/${courseRoom._id}`}
                            className="pointer"
                        >
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <IoEyeOutline size={25} />
                            </span>
                        </Link>
                    </Tooltip>
                );
            case "roomDetail":
                return (
                    <Link
                        href={`/teacher/course/room/single/${courseRoom._id}`}
                        className="pointer"
                    >

                        <Button
                            variant='flat'
                            color="primary"
                            startContent={<IoEyeOutline size={20} />}
                        >
                            ดูห้องเรียน
                        </Button>
                    </Link>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        {/* <Tooltip content="ดูห้องเรียน">
                            <Link
                                href={`/teacher/course/room/single/${courseRoom._id}`}
                                className="pointer"
                            >
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                    <IoEyeOutline size={25} />
                                </span>
                            </Link>
                        </Tooltip> */}
                        <Tooltip content="แก้ไข" className="ml-5">
                            <span
                                onClick={() => {
                                    onOpenModalUpdate();
                                    setCurrentRoom(courseRoom);
                                }}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <CiEdit size={25} />
                            </span>
                        </Tooltip>
                        <Tooltip content="ลบ">
                            <span
                                className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => openDeleteModal(courseRoom._id)}
                            >
                                <GoTrash size={25} />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <SideBarTeacher mobileSidebarOpen={mobileSidebarOpen} courseYearId={id} />
                <HeaderBarTeacher handleSidebarToggle={toggleSidebar} />

                <div className="h-full  mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                        <BreadcrumbItem><Link href={"/teacher/home"}>หน้าหลัก</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link href={`/teacher/course/year/${course._id}`}>{course.courseName} ม.{course.level}</Link></BreadcrumbItem>
                            <BreadcrumbItem>ปีการศึกษา {courseYear.year}</BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>

                    <main className="flex-1 mt-10 pb-16 sm:pb-32">

                        <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
                            <div className="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                                <div className="flex flex-col sm:flex-row justify-between gap-3 items-end">
                                    <Input
                                        isClearable
                                        className="w-full sm:w-auto sm:flex-grow"
                                        placeholder="ค้นหาชื่อห้องเรียน..."
                                        size="sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        startContent={<CiSearch size={25} className="text-default-300" />}
                                        variant="bordered"
                                    />

                                    <Button
                                        onPress={onOpenModalCreate}
                                        color="primary"
                                        variant="bordered"
                                        size="lg"
                                        radius="sm"
                                        className="mt-2 sm:mt-0 sm:ml-auto"
                                        startContent={<FaPlus />}
                                    >
                                        สร้างห้องเรียน
                                    </Button>
                                </div>


                                <div className="mt-7 overflow-x-auto">
                                    {isLoading ? (
                                        <div className="mt-7 overflow-x-auto">
                                            <div className="w-full flex items-center p-4 gap-3">
                                                <div className="w-full flex flex-col gap-4">
                                                    <Skeleton className="h-3 w-3/5 rounded-lg" />
                                                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                                                    <Skeleton className="h-3 w-5/5 rounded-lg" />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Table >
                                            <TableHeader columns={columns}>
                                                {(column) => (
                                                    <TableColumn className='text-base ' key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                                        {column.name}
                                                    </TableColumn>
                                                )}
                                            </TableHeader>
                                            <TableBody emptyContent={"ไม่พบห้องเรียน"}>
                                                    {courseRoom && courseRoom
                                                    .filter((item) => item.roomName.toLowerCase().includes(searchQuery.toLowerCase()))
                                                    .map((item, index) => (
                                                        <TableRow key={item._id}>
                                                            {columns.map((column) => (
                                                                <TableCell className='p-4'>{renderCell(item, column.uid, index + 1, course)}</TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            {/*Create */}
            <Modal
                isOpen={isOpenModalCreate}
                onOpenChange={onOpenChangeModalCreate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <AddCourseRoom
                            courseYearId={id}
                            onClose={onClose}
                            loadCourseRoom={loadCourseRoom}
                            courseLevel={course.level}
                        />
                    )}
                </ModalContent>
            </Modal>

            {/* Update */}
            <Modal
                isOpen={isOpenModalUpdate}
                onOpenChange={onOpenChangeModalUpdate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <UpdateCourseRoom
                            courseYearId={id}
                            onClose={onClose}
                            loadCourseRoom={loadCourseRoom}
                            currentRoom={currentRoom}
                            setCurrentRoom={setCurrentRoom} // Use setCurrentRoom here
                            courseLevel={course.level}

                        />

                    )}
                </ModalContent>
            </Modal>

            {/* Delete */}
            <Modal
                isOpen={isOpenModalDelete}
                onOpenChange={onOpenChangeModalDelete}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องลบห้องเรียนหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบห้องเรียนจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteRoom(roomId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div >
    )
}

export default CourseRoom
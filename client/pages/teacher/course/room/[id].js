import React, { useEffect, useState } from 'react'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import { FaPlus } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { CiEdit, CiSearch } from "react-icons/ci";
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher';
import { useRouter } from 'next/router';
import { Modal, ModalContent, useDisclosure, Link } from "@nextui-org/react";
import AddCourseRoom from '../../../../components/Modals/AddCourseRoom';
import axios from 'axios';
import UpdateCourseRoom from '../../../../components/Modals/UpdateCourseRoom';
import toast from 'react-hot-toast';



const CourseRoom = () => {

    const router = useRouter();
    const { id } = router.query;

    const { isOpen: isOpenModalCreate, onOpen: onOpenModalCreate, onOpenChange: onOpenChangeModalCreate } = useDisclosure();
    const { isOpen: isOpenModalUpdate, onOpen: onOpenModalUpdate, onOpenChange: onOpenChangeModalUpdate } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onOpenChange: onOpenChangeModalDelete } = useDisclosure();

    // Show Course Room
    const [courseRoom, setCourseRoom] = useState([])

    useEffect(() => {
        loadCourseRoom()
    }, [id])

    const loadCourseRoom = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoom/${id}`);
            if (Array.isArray(data)) {
                setCourseRoom(data);
            } else {
                console.error('Expected an array, but received:', data);
                setCourseRoom([]); // Set to empty array if data is not an array
            }
        } catch (error) {
            console.error('Error loading courses:', error);
            setCourseRoom([]); // Set to empty array in case of error
        }
    };

    // Update Room
    const [currentRoom, setCurrentRoom] = useState({});

    const handleUpdateRoom = async (e) => {
        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/courseRoom/${currentRoom._id}`,
                currentRoom
            );
            loadCourseRoom();
            toast.success("แก้ไขห้องเรียนสำเร็จ");
        } catch (error) {
            console.error(error); // Handle any errors that may occur during the deletion process
            toast.error("ไม่สามารถแก้ไขห้องเรียนได้");
        }
    };

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
        { name: "จัดการ", uid: "actions" },
    ];

    const renderCell = React.useCallback((courseRoom, columnKey, index) => {
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
                        <p className="text-lg  ">{courseRoom.roomName}</p>
                    </div>
                );
            case "student":
                return (
                    <div className="flex flex-col">
                        <p className="text-lg  ">39 คน</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" size="lg" variant="">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
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
                        <Tooltip content="แก้ไข">
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
                <SideBarTeacher courseYearId={id} />
                <HeaderBarTeacher />
                <div className="h-full ml-20 mt-28 mb-10 md:ml-64">
                    <div className="px-10">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>ชื่อวิชา</BreadcrumbItem>
                            <BreadcrumbItem>ชื่อปีการศึกษา</BreadcrumbItem>
                            <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>

                    <main className="flex-1 mt-10 pb-16 sm:pb-32">

                        <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
                            <div className="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                                <div className="flex justify-between gap-3 items-end">
                                    <Input
                                        isClearable
                                        classNames={{
                                            base: "w-full sm:max-w-[30%]",
                                            inputWrapper: "border-1",
                                        }}
                                        placeholder="ค้นหาชื่อห้องเรียน..."
                                        size="sm"
                                        startContent={<CiSearch size={25} className="text-default-300" />}
                                        variant="bordered"
                                    />
                                    <div className="flex gap-3">
                                        <Button onPress={onOpenModalCreate} className='ml-auto' color="primary" variant="bordered" size='md' radius="sm" startContent={<FaPlus />}>
                                            สร้างห้องเรียน
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-7 overflow-x-auto">
                                    <Table >
                                        <TableHeader columns={columns}>
                                            {(column) => (
                                                <TableColumn className='text-base ' key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                                    {column.name}
                                                </TableColumn>
                                            )}
                                        </TableHeader>
                                        <TableBody>
                                            {courseRoom && courseRoom.map((item, index) => (
                                                <TableRow key={item._id}>
                                                    {columns.map((column) => (
                                                        <TableCell className='p-4'>{renderCell(item, column.uid, index + 1)}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
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
                            handleUpdateRoom={handleUpdateRoom}
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
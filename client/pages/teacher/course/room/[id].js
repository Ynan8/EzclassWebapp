import React from 'react'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, Button, Input } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, getKeyValue } from "@nextui-org/react";
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher'
import { FaPlus } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import { CiEdit, CiSearch } from "react-icons/ci";
import SideBarTeacher from '../../../../components/Sidebar/SideBarTeacher';
const CourseRoom = () => {
    const columns = [
        { name: "ลำดับ", uid: "index" },
        { name: "ชื่อห้อง", uid: "roomName" },
        { name: "จำนวนนักเรียน", uid: "status" },
        { name: "จัดการ", uid: "actions" },
    ];

    const users = [
        {
            id: 1,
            name: "Tony Reichert",
            role: "CEO",
            team: "Management",
            status: "active",
            age: "29",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            email: "tony.reichert@example.com",
        },
        {
            id: 2,
            name: "Zoey Lang",
            role: "Technical Lead",
            team: "Development",
            status: "paused",
            age: "25",
            avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            email: "zoey.lang@example.com",
        },
        {
            id: 3,
            name: "Jane Fisher",
            role: "Senior Developer",
            team: "Development",
            status: "active",
            age: "22",
            avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            email: "jane.fisher@example.com",
        },
        {
            id: 4,
            name: "William Howard",
            role: "Community Manager",
            team: "Marketing",
            status: "vacation",
            age: "28",
            avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
            email: "william.howard@example.com",
        },
        {
            id: 5,
            name: "Kristen Copper",
            role: "Sales Manager",
            team: "Sales",
            status: "active",
            age: "24",
            avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
            email: "kristen.cooper@example.com",
        },
    ];

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "index":
                return (
                    <div className="">
                        1
                    </div>
                );
            case "roomName":
                return (
                    <div className="flex flex-col">
                        <p className="text-lg ">{cellValue}</p>
                        <p className="text-lg  ">{user.team}</p>
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
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <IoEyeOutline size={25} />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <CiEdit size={25} />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
                <SideBarTeacher />
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
                                            base: "w-full sm:max-w-[44%]",
                                            inputWrapper: "border-1",
                                        }}
                                        placeholder="ค้นหาชื่อห้องเรียน..."
                                        size="sm"
                                        startContent={<CiSearch size={25} className="text-default-300" />}
                                        variant="bordered"
                                    />
                                    <div className="flex gap-3">
                                        <Button className='ml-auto' color="primary" variant="bordered" size='md' radius="sm" startContent={<FaPlus />}>
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
                                        <TableBody items={users}>
                                            {(item) => (
                                                <TableRow key={item.id}>
                                                    {(columnKey) => <TableCell className='p-4'>{renderCell(item, columnKey)}</TableCell>}
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>

                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default CourseRoom
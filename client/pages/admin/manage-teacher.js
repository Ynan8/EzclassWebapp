import React, { useEffect, useState } from 'react'
import SideBarAdmin from "../../components/Sidebar/SideBarAdmin";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";
import axios from 'axios';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { FaEdit, FaFileExcel, FaPlus, FaTrash } from 'react-icons/fa';
import AddTeacher from '../../components/Modals/AddTeacher';
import toast from 'react-hot-toast';
import moment from "moment";
import UpdateTeacher from '../../components/Modals/UpdateTeacher';



const ManageTeacher = () => {
    const { isOpen: isOpenModalCreate, onOpen: onOpenModalCreate, onOpenChange: onOpenChangeModalCreate } = useDisclosure();
    const { isOpen: isOpenModalUpdate, onOpen: onOpenModalUpdate, onOpenChange: onOpenChangeModalUpdate } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onOpenChange: onOpenChangeModalDelete } = useDisclosure();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!firstName || !lastName || !username || !password) {
            return toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
        }

        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-teacher`, {
                firstName,
                lastName,
                username,
                password,
            });
            toast.success("เพิ่มผู้สอนสำเร็จ");
            // Clear form fields
            setFirstName("");
            setLastName("");
            setUsername("");
            setPassword("");
            onOpenChangeModalCreate(false); 
            loadDataTch();
        } catch (err) {
            toast.error(err.response.data);
        }
    };




    //list teacher
    const [teacherList, setTeacherList] = useState([]);

    useEffect(() => {
        loadDataTch();
    }, []);

    const loadDataTch = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['authtoken'] = token;
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/list-teacher`);
        setTeacherList(data);
    };

    // Update Teacher
    const [currentTch, setCurrentTch] = useState({});

    const handleUpdateTch = async () => {
        try {
            // Include the fields you want to update in the PUT request body
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/teacher/${currentTch._id}`,
                currentTch
            );
            loadDataTch();
            toast.success("แก้ไขข้อมูลผู้สอนสำเร็จ");
        } catch (error) {
            console.error(error);
            toast.error("ไม่สามารถแก้ไขข้อมูลผู้สอนได้");
        }
    };

    // Delete Teacher
    const [tchId, setTchId] = useState("");

    const openDeleteModal = (id) => {
        setTchId(id);
        onOpenModalDelete();
    };

    const handleDeleteTch = async (tchId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-teacher/${tchId}`);
            toast.success('ลบผู้สอนสำเร็จ');
            loadDataTch();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบผู้สอนได้');
        }
    };

    // search

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getFilteredTeachers = () => {
        if (!searchTerm) return teacherList; // If no search term, return all teachers

        return teacherList.filter(
            (teacher) =>
                teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                teacher.username.toLowerCase().includes(searchTerm.toLowerCase()) // Search by username as well
        );
    };



    return (
        <div>
            <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
                <SideBarAdmin />
                <HeaderBarAdmin />
                <div class="h-full ml-14 mt-28 mb-10 md:ml-80">
                    <div className="main-content  flex flex-col flex-grow p-4 container">
                        <div className="flex space-x-4">
                            <div className="mr-auto">
                                <form action="#">
                                    <div className="hidden md:flex relative">
                                        <input
                                            type="search"
                                            name="search"
                                            className="text-sm sm:text-base placeholder-gray-500 rounded-l pl-2 pr-4 border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                                            placeholder="ค้นหาผู้สอน"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                        <button
                                            class="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                            type="button"
                                            id="button-addon1"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                class="h-5 w-5"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex md:hidden">
                                        <button
                                            class="relative z-[2] flex items-center rounded bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                                            type="button"
                                            id="button-addon1"
                                            data-te-ripple-init
                                            data-te-ripple-color="light"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                class="h-5 w-5"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                                    clip-rule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="flex space-x-2 ml-auto">
                                <Button onPress={onOpenModalCreate} color="primary" size='lg' radius="md" startContent={<FaPlus />}>
                                    เพิ่มผู้สอน
                                </Button>
                            </div>
                        </div>

                        <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                            {/* <pre>{JSON.stringify(student,null,4)}</pre> */}
                            <table className="w-full border-b border-gray-200">
                                <thead>
                                    <tr className="text-lg font-medium border-b border-gray-200">
                                        <td className=" py-1 px-4 text-center ">ลำดับ</td>
                                        <td className=" py-1 px-4 text-center ">รหัสผู้สอน</td>
                                        <td className=" py-1 px-4 text-center ">ชื่อ-สกุล</td>
                                        <td className=" py-1 px-4 text-center ">เพิ่มเมื่อ</td>

                                    </tr>
                                </thead>
                                <tbody className='text-lg'>
                                    {getFilteredTeachers().map((teacher, index) => (
                                        <tr className=" h-16 transition-colors group">
                                            <td className="text-center py-2">{index + 1}</td>
                                            <td className="text-center py-2">{teacher.username}</td>
                                            <td className="text-center py-2">{teacher.firstName} {teacher.lastName}</td>
                                            <td className="text-center py-2">
                                                {moment(teacher.createdAt)
                                                    .locale("th")
                                                    .format("LLL")}
                                            </td>

                                            <td className="flex justify-center items-center text-center">
                                                <div
                                                    onClick={() => {
                                                        onOpenModalUpdate();
                                                        setCurrentTch(teacher);
                                                    }}
                                                    class="flex items-center duration-200 hover:text-yellow-500 justify-center w-full py-4 cursor-pointer">
                                                    <FaEdit size={25} />
                                                </div>
                                                <div
                                                    onClick={() => openDeleteModal(teacher._id)}
                                                    class="flex items-center duration-200 hover:text-red-500 justify-center w-full py-4 cursor-pointer">
                                                    <FaTrash size={23} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Create */}
            <Modal
                isOpen={isOpenModalCreate}
                onOpenChange={onOpenChangeModalCreate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <AddTeacher
                                onClose={onClose}
                                firstName={firstName}
                                setFirstName={setFirstName}
                                lastName={lastName}
                                setLastName={setLastName}
                                username={username}
                                setUsername={setUsername}
                                password={password}
                                setPassword={setPassword}
                                handleSubmit={handleSubmit}

                            />
                        </>
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
                        <UpdateTeacher
                            currentTch={currentTch}
                            setCurrentTch={setCurrentTch}
                            handleUpdateTch={handleUpdateTch}
                            onClose={onClose}
                        />
                    )}
                </ModalContent>
            </Modal>
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
                                    คุณต้องลบผู้สอนหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบผู้สอนจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteTch(tchId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ManageTeacher

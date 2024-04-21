import React, { useEffect, useState } from "react";
import SideBarAdmin from "../../components/Sidebar/SideBarAdmin";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";
import axios from "axios";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { FaEdit, FaFileExcel, FaPlus, FaTrash } from "react-icons/fa";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import AddTeacher from "../../components/Modals/AddTeacher";
import toast from "react-hot-toast";
import moment from "moment";
import "moment/locale/th";
import UpdateTeacher from "../../components/Modals/UpdateTeacher";

const ManageTeacher = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const {
    isOpen: isOpenModalCreate,
    onOpen: onOpenModalCreate,
    onOpenChange: onOpenChangeModalCreate,
  } = useDisclosure();
  const {
    isOpen: isOpenModalUpdate,
    onOpen: onOpenModalUpdate,
    onOpenChange: onOpenChangeModalUpdate,
  } = useDisclosure();
  const {
    isOpen: isOpenModalDelete,
    onOpen: onOpenModalDelete,
    onOpenChange: onOpenChangeModalDelete,
  } = useDisclosure();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!firstName || !lastName || !username || !password) {
      return toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/add-teacher`,
        {
          firstName,
          lastName,
          username,
          password,
        }
      );
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
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["authtoken"] = token;
    }
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/list-teacher`
    );
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
      toast.success("แก้ไขข้อมูลผู้สอนสำเร็จ");
      onOpenChangeModalUpdate(false);
      loadDataTch();
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
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/delete-teacher/${tchId}`
      );
      toast.success("ลบผู้สอนสำเร็จ");
      loadDataTch();
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("ไม่สามารถลบผู้สอนได้");
    }
  };

  // search

  const [searchTerm, setSearchTerm] = useState("");

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(teacherList.length / itemsPerPage);

  return (
    <div>
      <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <HeaderBarAdmin handleSidebarToggle={toggleSidebar} />
        <SideBarAdmin
          mobileSidebarOpen={mobileSidebarOpen}
        />
        <div class="h-full ml-0 mt-28 mb-10 md:ml-14 lg:ml-80">
          <div className="main-content  flex flex-col flex-grow p-4  container">
            <div className="flex space-x-4 md:py-7 px-4 md:px-8 xl:px-10">
              <div className="mr-auto">
                <form action="#">
                  <div className="hidden md:flex relative">
                    <input
                      type="search"
                      name="search"
                      className="text-sm sm:text-base placeholder-gray-500 rounded-l pl-2  border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
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

              <div className="flex ml-auto space-x-2">
                <Button
                  onClick={onOpenModalCreate}
                  radius='sm'
                  size="lg"
                  className="ml-3 flex items-center text-white "
                  color="primary"
                  startContent={
                    <FaPlus
                      size={20}
                    />
                  }
                >
                  <span className="ml-2 hidden md:inline">เพิ่มผู้สอน</span>
                </Button>

              </div>
            </div>

            <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
              {/* <pre>{JSON.stringify(student,null,4)}</pre> */}
              <div className="mt-4">
                <table className="w-full min-w-max border-b border-gray-200 text-xs sm:text-sm md:text-base whitespace-nowrap">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="text-xs sm:text-sm md:text-lg lg:text-xl font-medium border-gray-200">
                      <th className=" py-1 px-4 text-center sm:py-2">ลำดับ</th>
                      <th className=" py-1 px-4 text-center sm:py-2">
                        รหัสผู้สอน
                      </th>
                      <th className=" py-1 px-4  text-center sm:py-2">
                        ชื่อ-สกุล
                      </th>
                      <th className=" py-1 px-4  text-center sm:py-2">
                        เพิ่มเมื่อ
                      </th>
                      <th className=" py-1 px-4 text-center sm:py-2">จัดการ</th>
                    </tr>
                  </thead>
                      <tbody className="text-xs sm:text-sm md:text-lg">
                        {getFilteredTeachers()
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((teacher, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-16 transition-colors group">
                              <td className="text-center py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td className="text-center py-2">{teacher.username}</td>
                              <td className="text-center py-2">
                                {teacher.firstName} {teacher.lastName}
                              </td>
                              <td className="text-center py-2 sm:py-2">
                                {moment(teacher.createdAt)
                                  .locale("th")
                                  .format("D MMMM YYYY เวลา HH:mm น.")}
                              </td>

                              <td className="flex justify-center  text-center pt-4">
                                <div className="flex justify-center items-center space-x-2">
                                  <div
                                    className="flex flex-col justify-center sm:flex-row items-center px-1 py-1 bg-yellow-100 text-center text-yellow-500 rounded-md flex-shrink-0 whitespace-nowrap hover:bg-yellow-200 cursor-pointer"
                                    onClick={() => {
                                      onOpenModalUpdate();
                                      setCurrentTch(teacher);
                                    }}
                                  >
                                    <RiEdit2Line size={20} className="sm:mr-1" />
                                    <span className="hidden sm:inline-block text-xs sm:text-sm px-1 py-1">
                                      แก้ไขผู้ใช้
                                    </span>
                                  </div>

                                  <div
                                    className="flex flex-col justify-center sm:flex-row items-center px-1 py-1 bg-red-100 text-center text-red-400 rounded-md flex-shrink-0 whitespace-nowrap hover:bg-red-200 cursor-pointer"
                                    onClick={() => openDeleteModal(teacher._id)}
                                  >
                                    <RiDeleteBinLine size={20} className="sm:mr-1" />
                                    <span className="hidden sm:inline-block text-xs sm:text-sm px-1 py-1">
                                      ลบผู้ใช้
                                    </span>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                </table>
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
                <p className="text-lg font-medium leading-6 text-gray-900">
                  คุณต้องลบผู้สอนหรือไม่ ?
                </p>
              </ModalHeader>
              <ModalBody>
                <p className="text-base text-gray-500">
                  การลบผู้สอนจะไม่สามารถกู้คืนได้
                  แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button
                  color="danger"
                  onPress={onClose}
                  onClick={() => handleDeleteTch(tchId)}
                >
                  ยืนยัน
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ManageTeacher;
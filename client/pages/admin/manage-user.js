import React, { useEffect, useState } from "react";
import SideBarAdmin from "../../components/Sidebar/SideBarAdmin";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";
import axios from "axios";
import { Tabs, Tab, Card, CardBody, Pagination, Input } from "@nextui-org/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { FaEdit, FaFileExcel, FaPlus, FaTrash } from "react-icons/fa";
import { RiEdit2Line, RiDeleteBinLine } from "react-icons/ri";
import AddTeacher from "../../components/Modals/AddTeacher";
import toast from "react-hot-toast";
import moment from "moment";
import "moment/locale/th";
import UpdateTeacher from "../../components/Modals/UpdateTeacher";
import AddStudent from "../../components/Modals/AddStudent";
import UpdateStudent from "../../components/Modals/UpdateStudent";
import UploadStudentFile from "../../components/Modals/UploadStudentFile";
import { CiSearch } from "react-icons/ci";

const ManageUser = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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



  //list teacher
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    loadDataStd();
  }, []);

  const loadDataStd = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["authtoken"] = token;
    }
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/list-student`
    );
    setStudentList(data);
  };

  const getFilteredStudents = () => {
    if (!searchTerm) return studentList; // If no search term, return all teachers

    return studentList.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.username.toLowerCase().includes(searchTerm.toLowerCase()) // Search by username as well
    );
  };



  const { isOpen: isOpenModalExcel, onOpen: onOpenModalExcel, onOpenChange: onOpenChangeModalExcel } = useDisclosure();
  const { isOpen: isOpenModalStudent, onOpen: onOpenModalStudent, onOpenChange: onOpenChangeModalStudent } = useDisclosure();
  const { isOpen: isOpenModalUpdateStd, onOpen: onOpenModalUpdateStd, onOpenChange: onOpenChangeModalUpdateStd } = useDisclosure();
  const { isOpen: isOpenModalDeleteStd, onOpen: onOpenModalDeleteStd, onOpenChange: onOpenChangeModalDeleteStd } = useDisclosure();

  const [stdId, setStdId] = useState("");

  const openDeleteModalStd = (id) => {
    setStdId(id);
    onOpenModalDeleteStd();
  };


  const handleDeleteStudent = async (idStudent) => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-student/${idStudent}`);
      loadDataStd();
      toast.success("ลบนักเรียนสำเร็จ");
    } catch (error) {
      console.error(error); // Handle any errors that may occur during the deletion process
      toast.error("ไม่สามารถลบนักเรียนได้");
    }
  };

  const [currentStd, setCurrentStd] = useState({});


  const itemsPerPage = 10;
  const [currentPageStd, setCurrentPageStd] = useState(1);
  const totalPages = Math.ceil(studentList.length / itemsPerPage);

  const [currentPageTch, setCurrentPageTch] = useState(1);
  const totalPagesTch = Math.ceil(teacherList.length / itemsPerPage);

  return (
    <div>
      <div class="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        <HeaderBarAdmin handleSidebarToggle={toggleSidebar} />
        <SideBarAdmin
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        <div class="h-full ml-0 mt-28 mb-10 md:ml-14 lg:ml-80">

          <div className="main-content  flex flex-col flex-grow p-4  container">
            {/* TABS */}
            <div className="relative shadow-md sm:rounded-lg whitespace-nowrap">

              <Tabs
                size="lg"
                aria-label="Options">
                <Tab key="teacher" title="คุณครู">
                  <Card>
                    <CardBody>
                      <div className="flex space-x-4 md:py-7 px-4 md:px-8 xl:px-10">

                        <div className="mr-auto">
                         
                          <Input
                            isClearable
                            className="w-full sm:w-auto sm:flex-grow"
                            placeholder="ค้นหาชื่อผู้สอน..."
                            size="sm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            startContent={<CiSearch size={25} className="text-default-300" />}
                            variant="bordered"
                          />

                        </div>

                        <div className="flex item-center ml-auto space-x-2">
                          {/* <button
                            onClick={onOpenModalCreate}
                            className="inline-flex items-center justify-center px-4 sm:px-3  py-1 sm:py-2 text-xs sm:text-sm md:text-sm lg:text-base bg-primary-500 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring focus:ring-primary-300"
                          >
                            <FaPlus className="text-center" />
                            <span className="ml-2 hidden md:inline">เพิ่มผู้สอน</span>
                          </button> */}
                          <Button
                            onPress={onOpenModalCreate}
                            radius='sm'
                            className="ml-3 flex items-center text-white "
                            color="primary"
                            startContent={
                              <FaPlus
                                size={20}
                              />
                            }
                          >
                            <p class=" font-medium leading-none">เพิ่มผู้สอน</p>
                          </Button>
                        </div>
                      </div>

                      {/* table */}
                      <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                        {/* <pre>{JSON.stringify(studentList, null, 4)}</pre> */}
                        <div className="mt-4 overflow-x-auto">
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
                                .slice((currentPageTch - 1) * itemsPerPage, currentPageTch * itemsPerPage)
                                .map((teacher, index) => (
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-16 transition-colors group">
                                    <td className="text-center py-2">{(currentPageTch - 1) * itemsPerPage + index + 1}</td>
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
                        </div>
                        <div className="flex justify-center mt-2">
                          <Pagination
                            size='lg'
                            total={totalPagesTch}
                            initialPage={1}
                            page={currentPageTch}
                            onChange={(page) => setCurrentPageTch(page)}
                          />

                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="student" title="นักเรียน">
                  <Card>
                    <CardBody>
                      <div className="flex space-x-4 md:py-7 px-4 md:px-8 xl:px-10">

                        <div className="mr-auto">
                         
                           <Input
                            isClearable
                            className="w-full sm:w-auto sm:flex-grow"
                            placeholder="ค้นหาชื่อนักเรียน..."
                            size="sm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            startContent={<CiSearch size={25} className="text-default-300" />}
                            variant="bordered"
                          />

                        </div>

                        <div className="flex">
                          <Button
                            onPress={onOpenModalStudent}
                            radius='sm'
                            className="ml-3 flex items-center text-white "
                            color="primary"
                            startContent={
                              <FaPlus
                                size={20}
                              />
                            }
                          >
                            <p class=" font-medium leading-none">เพิ่มนักเรียน</p>
                          </Button>
                          <Button
                            onPress={onOpenModalExcel}
                            radius='sm'
                            className="ml-3 flex items-center text-white "
                            color="success"
                            startContent={
                              <FaFileExcel
                                size={20}
                              />
                            }
                          >
                            <p class=" font-medium leading-none">Import Excel</p>
                          </Button>
                        </div>
                      </div>

                      {/* table */}
                      <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                        {/* <pre>{JSON.stringify(student,null,4)}</pre> */}
                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full min-w-max border-b border-gray-200 text-xs sm:text-sm md:text-base whitespace-nowrap">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr className="text-xs sm:text-sm md:text-lg lg:text-xl font-medium border-gray-200">
                                <th className=" py-1 px-4 text-center sm:py-2">ลำดับ</th>
                                <th className=" py-1 px-4 text-center sm:py-2">
                                  รหัสนักเรียน
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
                              {getFilteredStudents()
                                .slice((currentPageStd - 1) * itemsPerPage, currentPageStd * itemsPerPage)
                                .map((student, index) => (
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-16 transition-colors group">
                                    <td className="text-center py-2">{(currentPageStd - 1) * itemsPerPage + index + 1}</td>
                                    <td className="text-center py-2">{student.username}</td>
                                    <td className="text-center py-2">
                                      {student.firstName} {student.lastName}
                                    </td>
                                    <td className="text-center py-2 sm:py-2">
                                      {moment(student.createdAt)
                                        .locale("th")
                                        .format("D MMMM YYYY เวลา HH:mm น.")}
                                    </td>

                                    <td className="flex justify-center  text-center pt-4">
                                      <div className="flex justify-center items-center space-x-2">
                                        <div
                                          className="flex flex-col justify-center sm:flex-row items-center px-1 py-1 bg-yellow-100 text-center text-yellow-500 rounded-md flex-shrink-0 whitespace-nowrap hover:bg-yellow-200 cursor-pointer"
                                          onClick={() => {
                                            onOpenModalUpdateStd();
                                            setCurrentStd(student);
                                          }}
                                        >
                                          <RiEdit2Line size={20} className="sm:mr-1" />
                                          <span className="hidden sm:inline-block text-xs sm:text-sm px-1 py-1">
                                            แก้ไขผู้ใช้
                                          </span>
                                        </div>

                                        <div
                                          className="flex flex-col justify-center sm:flex-row items-center px-1 py-1 bg-red-100 text-center text-red-400 rounded-md flex-shrink-0 whitespace-nowrap hover:bg-red-200 cursor-pointer"
                                          onClick={() => openDeleteModalStd(student._id)}
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
                        </div>
                        <div className="flex justify-center mt-2">
                          <Pagination
                            size='lg'
                            total={totalPages}
                            initialPage={1}
                            page={currentPageStd}
                            onChange={(page) => setCurrentPageStd(page)}
                          />

                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Tab>

              </Tabs>

            </div>
            {/* TABS */}



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

      {/* Student */}

      <Modal
        size={'4xl'}
        isOpen={isOpenModalExcel}
        onClose={onOpenChangeModalExcel}
        placement="top-center"

      >
        <ModalContent>
          {(onClose) => (
            <>
              <UploadStudentFile
                // courseRoomId={id}
                onClose={onClose}
                loadDataStd={loadDataStd}
              />
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        size={'xl'}
        isOpen={isOpenModalStudent}
        onClose={onOpenChangeModalStudent}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <AddStudent
                onClose={onClose}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                loadDataStd={loadDataStd}
              // id={id}
              />
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete */}
      <Modal
        isOpen={isOpenModalDeleteStd}
        onOpenChange={onOpenChangeModalDeleteStd}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-lg font-medium leading-6 text-gray-900"
                >
                  คุณต้องการลบนักเรียนหรือไม่ ?
                </p>
              </ModalHeader>
              <ModalBody>
                <p className="text-base text-gray-500">
                  การลบนักเรียนจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                </p>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button color="danger" onPress={onClose} onClick={() => handleDeleteStudent(stdId)}>
                  ยืนยัน
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Update */}
      <Modal
        isOpen={isOpenModalUpdateStd}
        onOpenChange={onOpenChangeModalUpdateStd}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <UpdateStudent
              currentStd={currentStd}
              setCurrentStd={setCurrentStd}
              loadDataStd={loadDataStd}
              onClose={onClose}
            />
          )}
        </ModalContent>
      </Modal>

    </div>
  );
};

export default ManageUser;
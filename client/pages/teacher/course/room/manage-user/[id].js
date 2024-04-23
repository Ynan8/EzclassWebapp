import React, { useEffect, useState } from 'react'
import TeacherRoute from '../../../../../components/Routes/TeacherRoute';
import { useRouter } from 'next/router';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import { FaEdit, FaFileExcel, FaPlus, FaTrash } from 'react-icons/fa';
import { BreadcrumbItem, Breadcrumbs, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, useDisclosure } from '@nextui-org/react';
import UploadStudentFile from '../../../../../components/Modals/UploadStudentFile';
import axios from 'axios';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import AddStudent from '../../../../../components/Modals/AddStudent';
import UpdateStudent from '../../../../../components/Modals/UpdateStudent';
import toast from 'react-hot-toast';
import Image from 'next/image';
import find from '../../../../../public/find.png'
import { GoTrash } from "react-icons/go";
import { CiEdit, CiSearch } from "react-icons/ci";
import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import SideBarTeacher from '../../../../../components/Sidebar/SideBarTeacher';
import moment from "moment/min/moment-with-locales";




const ManageUser = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  // Show Course Year
  const router = useRouter();
  const { id } = router.query;

  // Load CourseRoom
  const [courseRoomSingle, setCourseRoomSingle] = useState({});

  const courseYearId = courseRoomSingle.courseYearId
  console.log(courseYearId)


  useEffect(() => {
    if (id) {
      loadCourseRoom();
    }
  }, [id]);


  const loadCourseRoom = async () => {
    if (id) {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseRoomSingle/${id}`);
        setCourseRoomSingle(data);
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  // Show Course Year
  const [courseYear, setCourseYear] = useState({});

  useEffect(() => {
    if (courseYearId) {
      loadCourseYear();
    }
  }, [courseYearId]);

  const loadCourseYear = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/single/${courseYearId}`);
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


  const { isOpen: isOpenModalExcel, onOpen: onOpenModalExcel, onOpenChange: onOpenChangeModalExcel } = useDisclosure();
  const { isOpen: isOpenModalStudent, onOpen: onOpenModalStudent, onOpenChange: onOpenChangeModalStudent } = useDisclosure();
  const { isOpen: isOpenModalUpdate, onOpen: onOpenModalUpdate, onOpenChange: onOpenChangeModalUpdate } = useDisclosure();
  const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onOpenChange: onOpenChangeModalDelete } = useDisclosure();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [student, setStudent] = useState([]);
  const loadStudentCourse = async () => {
    if (id) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['authtoken'] = token;
        }
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/studentRoom/${id}`);
        setStudent(data)
      } catch (error) {
        console.error("Error loading course:", error);
      }
    }
  }

  useEffect(() => {
    if (id) {
      loadStudentCourse();
    }
  }, [id]);

  // Update Student
  const [currentStd, setCurrentStd] = useState({});




  // Delete Student
  const [stdId, setStdId] = useState("");

  const openDeleteModal = (id) => {
    setStdId(id);
    onOpenModalDelete();
  };

  const handleDeleteStudent = async (idStudent) => {
    try {
      const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API}/courseRoom/${idStudent}/${id}`);
      loadStudentCourse();
      toast.success("ลบนักเรียนสำเร็จ");
    } catch (error) {
      console.error(error); // Handle any errors that may occur during the deletion process
      toast.error("ไม่สามารถลบนักเรียนได้");
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(student.length / itemsPerPage);


  return (
    <TeacherRoute>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <SideBarTeacher mobileSidebarOpen={mobileSidebarOpen} courseYearId={courseYearId} />
        <HeaderBarTeacher handleSidebarToggle={toggleSidebar} />
        <div className="h-full  mt-16 mb-10 md:ml-64">
          <Navbar
            classNames={{
              item: [
                "flex",
                "relative",
                "h-full",
                "items-center",
                "data-[active=true]:after:content-['']",
                "data-[active=true]:after:absolute",
                "data-[active=true]:after:bottom-0",
                "data-[active=true]:after:left-0",
                "data-[active=true]:after:right-0",
                "data-[active=true]:after:h-[2px]",
                "data-[active=true]:after:rounded-[2px]",
                "data-[active=true]:after:bg-primary",
              ],
            }}
          >
            <NavbarContent className="gap-3" justify="start">
              <NavbarItem  >
                <Link
                  href={`/teacher/course/room/single/${id}/`}
                >
                  ภาพรวมห้องเรียน
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href={`/teacher/course/room/assignment/${id}/`}
                >
                  ตรวจงาน
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link
                  href={`/teacher/course/room/gradeBook/${id}/`}
                >
                  ผลการเรียน
                </Link>
              </NavbarItem>
              <NavbarItem isActive>
                <Link
                  href={`/teacher/course/room/manage-user/${id}/`}
                >
                  จัดการชื่อผู้ใช้
                </Link>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <div className="mt-10 px-10">
            {/* Breadcrumbs */}
            <Breadcrumbs size='lg' maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={1}>
              <BreadcrumbItem>
                <Link href={'/teacher/home'}>
                  หน้าหลัก
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href={`/teacher/course/room/${courseYearId}`}>
                  {course.courseName} {courseRoomSingle.roomName}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href={`/teacher/course/year/${course._id}`}>
                  ปีการศึกษา {courseYear.year}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
              <BreadcrumbItem>จัดการผู้ใช้</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <main className="flex-1 mt-10 pb-16 sm:pb-32">
            <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
              <div className="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div className="flex items-center justify-between px-4">
                  <p className='md:text-2xl  sm:text-lg font-semibold'>ข้อมูลนักเรียน</p>
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
                <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                  <div class="overflow-x-auto">
                    {/* <pre>{JSON.stringify(student,null,4)}</pre> */}
                    <table className="w-full border-b border-gray-200">
                      <thead>
                        <tr className="text-lg md:text-base sm:text-sm border-b border-gray-200">
                          <th className="py-1 px-4 text-center">ลำดับ</th>
                          <th className="py-1 px-4 text-center">รหัสนักเรียน</th>
                          <th className="py-1 px-4 text-center">ชื่อ-สกุล</th>
                          <th className="py-1 px-4 text-center">วันที่เพิ่ม</th>
                        </tr>
                      </thead>
                      <tbody className="text-lg md:text-base sm:text-sm">
                        {student
                          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                          .map((student, index) => (
                            <tr className="h-16 transition-colors group">
                              <td className="text-center py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                              <td className="text-center py-2">{student.username}</td>
                              <td className="text-center py-2">{student.firstName} {student.lastName}</td>
                              <td className="text-center py-2">
                                {moment(student.createdAt)
                                  .locale('th')
                                  .format('LL HH:mm')}
                              </td>
                              <td className="flex justify-center items-center text-center">
                                <div
                                  onClick={() => {
                                    onOpenModalUpdate();
                                    setCurrentStd(student);
                                  }}
                                  className="flex items-center space-x-2 duration-200 hover:text-yellow-500 justify-center w-full py-4 cursor-pointer">
                                  <CiEdit size={25} />
                                </div>
                                <div
                                  onClick={() => openDeleteModal(student._id)}
                                  className="flex items-center duration-200 hover:text-red-500 justify-center w-full py-4 cursor-pointer">
                                  <GoTrash size={23} />
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
                      page={currentPage}
                      onChange={(page) => setCurrentPage(page)}
                    />

                  </div>
                  <div className="flex flex-col text-center mt-4">
                    {student.length === 0 ? (
                      <div className="flex flex-col items-center justify-center w-full h-[400px]">
                        <Image
                          width={250}
                          height={200}
                          alt="No course"
                          src={find}
                        />
                        <p className="md:text-2xl sm:text-lg text-gray-800">ยังไม่มีนักเรียนในห้องเรียนนี้</p>
                        <p className="md:text-lg  sm:text-text-base text-gray-600">
                          คลิกที่ปุ่ม <span className='text-blue-800 font-semibold'>เพิ่มนักเรียน</span> หรือ <span className='text-blue-800 font-semibold'>Import Excel</span> เพื่อเพิ่มนักเรียนเข้าห้องเรียน
                        </p>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Modal
        size={'4xl'}
        isOpen={isOpenModalExcel}
        onClose={onOpenChangeModalExcel}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <UploadStudentFile
                courseRoomId={id}
                onClose={onClose}
                loadStudentCourse={loadStudentCourse}
              />
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        size={'xl'}
        isOpen={isOpenModalStudent}
        onClose={onOpenChangeModalStudent}
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
                loadStudentCourse={loadStudentCourse}
                id={id}
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
            <UpdateStudent
              currentStd={currentStd}
              setCurrentStd={setCurrentStd}
              loadStudentCourse={loadStudentCourse}
              onClose={onClose}
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
    </TeacherRoute>
  )
}

export default ManageUser

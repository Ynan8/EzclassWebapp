import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import { FaEdit, FaFileExcel, FaPlus, FaTrash } from 'react-icons/fa';
import { BreadcrumbItem, Breadcrumbs, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import UploadStudentFile from '../../../../../components/Modals/UploadStudentFile';
import axios from 'axios';
import HeaderBarTeacher from '../../../../../components/HeaderBar/HeaderBarTeacher';
import AddStudent from '../../../../../components/Modals/AddStudent';
import UpdateStudent from '../../../../../components/Modals/UpdateStudent';
import toast from 'react-hot-toast';


const ManageUser = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation
    if (!firstName || !lastName || !username || !password) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
  
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-student/${id}`, {
        firstName,
        lastName,
        username,
        password,
      });
      toast.success("เพิ่มนักเรียนสำเร็จ");
      loadStudentCourse();
      onClose(); // Close the modal after successful submission
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  

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

  const handleUpdateStd = async () => {
    try {
      // Include the fields you want to update in the PUT request body
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API}/student/${currentStd._id}`,
        currentStd
      );
      loadStudentCourse();
      toast.success("แก้ไขข้อมูลนักเรียนสำเร็จ");
    } catch (error) {
      console.error(error);
      toast.error("ไม่สามารถแก้ไขข้อมูลนักเรียนได้");
    }
  };


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

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <SidebarTeacherRoom id={id} />
        <HeaderBarTeacher />
        <div className="h-full ml-20 mt-28 mb-10 md:ml-64">

          <div className="px-10">
            {/* Breadcrumbs */}
            <Breadcrumbs size='lg' maxItems={4} itemsBeforeCollapse={2} itemsAfterCollapse={1}>
              <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
              <BreadcrumbItem>{course.courseName} {courseRoomSingle.roomName}</BreadcrumbItem>
              <BreadcrumbItem>ปีการศึกษา {courseYear.year}</BreadcrumbItem>
              <BreadcrumbItem>ห้องเรียน</BreadcrumbItem>
              <BreadcrumbItem>จัดการผู้ใช้</BreadcrumbItem>
            </Breadcrumbs>
          </div>
          <main className="flex-1 mt-10 pb-16 sm:pb-32">
            <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
              <div className="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div className="sm:flex items-center justify-between px-4">
                  <p className='text-2xl font-semibold'>ข้อมูลนักเรียน</p>
                  <div className="flex ml-auto">
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
                  {/* <pre>{JSON.stringify(student,null,4)}</pre> */}
                  <table className="w-full border-b border-gray-200">
                    <thead>
                      <tr className="text-lg font-medium border-b border-gray-200">
                        <td className=" py-1 px-4 text-center ">ลำดับ</td>
                        <td className=" py-1 px-4 text-center ">รหัสนักเรียน</td>
                        <td className=" py-1 px-4 text-center ">ชื่อ-สกุล</td>
                        <td className=" py-1 px-4 text-center ">เข้าเรียนล่าสุด</td>

                      </tr>
                    </thead>
                    <tbody className='text-lg'>
                      {student.map((student, index) => (
                        <tr className=" h-16 transition-colors group">
                          <td className="text-center py-2">{index + 1}</td>
                          <td className="text-center py-2">{student.username}</td>
                          <td className="text-center py-2">{student.firstName} {student.lastName}</td>
                          <td className="text-center py-2">ยังไม่เข้าเรียน</td>

                          <td className="flex justify-center items-center text-center">
                            <div
                              onClick={() => {
                                onOpenModalUpdate();
                                setCurrentStd(student);
                              }}
                              className="flex items-center duration-200 hover:text-yellow-500 justify-center w-full py-4 cursor-pointer">
                              <FaEdit size={25} />
                            </div>
                            <div
                              onClick={() => openDeleteModal(student._id)}
                              className="flex items-center duration-200 hover:text-red-500 justify-center w-full py-4 cursor-pointer">
                              <FaTrash size={23} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex flex-col text-center mt-4">
                    {student.length === 0 ? (
                      <>
                        <h1 className='text-4xl font-bold text-gray-500 mb-3' >ยังไม่มีนักเรียนในห้องเรียน</h1>
                        <p className="text-gray-600">
                          คุณยังไม่มีนักเรียนในห้องเรียนนี้ คลิกที่ปุ่ม <span className='text-blue-800 font-semibold'>เพิ่มนักเรียน</span> หรือ <span className='text-blue-800 font-semibold'>Import Excel</span>  เพื่อเพิ่มนักเรียน
                        </p>
                      </>
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
            <UpdateStudent
              currentStd={currentStd}
              setCurrentStd={setCurrentStd}
              handleUpdateStd={handleUpdateStd}
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
    </div>
  )
}

export default ManageUser
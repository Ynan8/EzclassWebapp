import React, { useContext, useEffect, useState } from 'react';
import HeaderBarTeacher from '../../components/HeaderBar/HeaderBarTeacher';
import { FaPlus } from "react-icons/fa";
import { Button, CardFooter, Skeleton } from '@nextui-org/react';
import { Card, CardBody } from "@nextui-org/react";
import { Tabs, Tab, } from "@nextui-org/react";
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Context } from '../../context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import noCourse from '../../public/noCourse.png'


const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [courseImgLoading, setCourseImgLoading] = useState(false);
  const router = useRouter();

  const { state: { user } } = useContext(Context);

  useEffect(() => {
    if (user !== null && user.role === 'teacher') {
      router.push('/teacher/home')
    } else if (user !== null && user.role === 'student') {
      router.push('/student/home')
    } else if (user !== null && user.role === 'admin') {
      router.push('/admin/home')
    }
  }, [user])



  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['authtoken'] = token;
      }

      setCourseImgLoading(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/teacher-courses`);
      setCourses(data);
      setCourseImgLoading(false);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourseImgLoading(false);
    }
  };

  const handleArchivedCourse = async (courseId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/archived-course/${courseId}`);
      toast.success('จัดเก็บรายวิชาสำเร็จ');
      loadCourses();
    } catch (error) {
      console.error('Error canceling:', error);
      toast.error('ไม่สามารถจัดเก็บรายวิชา ลองอีกครั้ง!!');
    }
  };

  const handleCancelArchivedCourse = async (courseId) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/cancel-archived-course/${courseId}`);

      toast.success('ยกเลิกจัดเก็บรายวิชาสำเร็จ');
      loadCourses();
    } catch (error) {
      console.error('Error canceling:', error);
      toast.error('ไม่สามารถยกเลิกจัดเก็บรายวิชา ลองอีกครั้ง!!');
    }
  };

  // Delete Course
  const [courseId, setCourseId] = useState("");

  const openDeleteModal = (id) => {
    setCourseId(id);
    onOpen();
  };

  const handleDeleteCourse = async (courseId) => {

    setIsLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-course/${courseId}`);

      toast.success('ลบรายวิชาสำเร็จ');
      loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course. Please try again.');
    }
    finally {
      setIsLoading(false);
    }
  };



  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <HeaderBarTeacher />
        <main className="flex-1 pb-16 sm:pb-32">
          <div className="pt-10 sm:pt-12">
            <div className="container mx-auto px-4 sm:px-6 xl:px-12">
              <div className="mt-14 ">
                <div className="flex items-center justify-between my-8">
                  <div className="flex space-x-2 justify-center item-center">
                    {/* <SearchCourse /> */}
                  </div>
                  <div className="flex items-center">
                    <Link href={'/teacher/createCourse'} >
                      <Button className='px-10' color="primary" variant="shadow" size='lg' radius="lg" startContent={<FaPlus />}>
                        สร้างรายวิชา
                      </Button>
                    </Link>
                  </div>
                </div>
                <h1 className=" text-2xl mb-2 font-semibold text-gray-800"
                >
                  รายวิชาทั้งหมด
                </h1>
                <div className="flex flex-wrap gap-4 mb-4">
                  {courseImgLoading ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Card className="w-[340px] h-[300px] space-y-5 p-4" radius="lg" key={index}>
                          <Skeleton className="rounded-lg">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                          </Skeleton>
                          <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <>
                      {courses && courses.length > 0 ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                          {courses.filter(course => course.status === true).map(course => (
                            <Card key={course._id} className="py-8">
                              <div className="absolute top-0 right-0 m-2">
                                <Dropdown>
                                  <DropdownTrigger>
                                    <Button
                                      size='sm'
                                      variant="light"
                                      startContent={<BsThreeDotsVertical size={20} />}
                                    />
                                  </DropdownTrigger>
                                  <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                                    <DropdownItem key="edit">
                                      <Link
                                        href={`/teacher/course/edit/[id]`}
                                        as={`/teacher/course/edit/${course._id}`}
                                      >
                                        <p>แก้ไขรายวิชา</p>
                                      </Link>
                                    </DropdownItem>
                                    <DropdownItem onPress={onOpen} key="delete" className="text-danger" color="danger">
                                      <p
                                        onClick={() => openDeleteModal(course._id)}
                                      >ลบรายวิชา</p>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </div>
                              <Link href={`/teacher/course/year/[id]`} as={`/teacher/course/year/${course._id}`}>
                                <CardBody className="overflow-visible">
                                  <div className="w-full grid place-items-center">
                                    <img
                                      className="object-cover rounded"
                                      src={course.image.Location}
                                      alt={course.courseName}
                                    />
                                  </div>
                                </CardBody>
                              </Link>
                              <CardFooter className="pb-0 px-4 flex-col items-start">
                                <h4 className="font-bold text-large">
                                  {course.courseName.length > 30
                                    ? `${course.courseNo} : ${course.courseName.substring(0, 25)}...`
                                    : `${course.courseNo} : ${course.courseName}`
                                  }
                                </h4>
                                <p className="text-lg font-bold">
                                  {course.level.length > 30
                                    ? `${course.level.substring(0, 60)}...`
                                    : `มัธยมศึกษาปีที่ ${course.level}`
                                  }
                                </p>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center w-full h-[600px]">
                          <div className="flex flex-col items-center justify-center w-full h-[600px]">
                            <Image
                              width={250}
                              height={150}
                              alt="No course"
                              src={noCourse}
                            />

                            <p className="text-lg text-gray-800">ไม่มีรายวิชาในขณะนี้</p>
                            <p className="text-gray-600">
                              คลิกที่ปุ่ม <span className='text-blue-800 font-semibold'>สร้างรายวิชา</span> เพื่อสร้างห้องเรียนเขียนโค้ด
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="text-lg font-medium leading-6 text-gray-900"
                >
                  คุณต้องลบรายวิชาหรือไม่ ?
                </p>
              </ModalHeader>
              <ModalBody>
                <p className="text-base text-gray-500">
                  การลบรายวิชาจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                </p>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  ยกเลิก
                </Button>
                <Button
                  isLoading={isLoading}
                  color="danger"
                  onPress={onClose}
                  onClick={() => handleDeleteCourse(courseId)}
                >
                  {isLoading ? "กำลังโหลด..." : "ยืนยัน"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;

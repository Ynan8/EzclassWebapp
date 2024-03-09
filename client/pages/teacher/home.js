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


const Home = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [courseImgLoading, setCourseImgLoading] = useState(false);

  const { state: { user } } = useContext(Context);

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
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-course/${courseId}`);

      toast.success('ลบรายวิชาสำเร็จ');
      loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast.error('Failed to delete course. Please try again.');
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
                      <Button color="primary" variant="shadow" size='lg' radius="md" startContent={<FaPlus />}>
                        สร้างรายวิชา
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <Tabs size="lg" aria-label="Options">
                    <Tab key="active" title="รายวิชาที่สอน">
                      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                        {courseImgLoading ? (
                          Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="rounded-lg h-64" />
                          ))
                        ) : (
                          courses && courses
                            .filter(course => course.status === true)
                            .map(course => (
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
                                      <DropdownItem onClick={() => handleArchivedCourse(course._id)} key="new">
                                        <p >จัดเก็บรายวิชา</p>
                                      </DropdownItem>
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
                            ))
                        )}
                      </div>
                    </Tab>
                    <Tab key="archived" title="รายวิชาที่จัดเก็บ">
                      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                        {courseImgLoading ? (
                          Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="rounded-lg h-64" />
                          ))
                        ) : (
                          courses && courses
                            .filter(course => course.status === false)
                            .map(course => (
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
                                      <DropdownItem onClick={() => handleCancelArchivedCourse(course._id)} key="new">
                                        <p >ยกเลิกการจัดเก็บ</p>
                                      </DropdownItem>
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
                                  <p className="text-tiny uppercase font-bold">
                                    {course.level.length > 30
                                      ? `${course.level.substring(0, 60)}...`
                                      : `มัธยมศึกษาปีที่ ${course.level}`
                                    }
                                  </p>
                                </CardFooter>
                              </Card>
                            ))
                        )}
                      </div>
                    </Tab>
                  </Tabs>
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
                <Button color="danger" onPress={onClose} onClick={() => handleDeleteCourse(courseId)}>
                  ยืนยัน
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

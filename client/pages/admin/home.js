import React, { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import HeaderBarAdmin from "../../components/HeaderBar/HeaderBarAdmin";
import SideBarAdmin from "../../components/Sidebar/SideBarAdmin";
import AdminTeacherCard from "../../components/Cards/AdminTeacherCard";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import InfoTeacher from "../../components/Modals/InfoTeacher";

const Home = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //list student
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

  //list teacher
  const [teacherList, setTeacherList] = useState([]);
  useEffect(() => {
    loadDataTch();
  }, []);
  const loadDataTch = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/list-teacher`
    );
    setTeacherList(data);
  };

  //list course
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    loadDataCourseList();
  }, []);
  const loadDataCourseList = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/list-course`
    );
    setCourseList(data);
  };

  const [teacher, setTeacher] = useState("");

  const teacherModal = (teacher) => {
    setTeacher(teacher);
    onOpen();
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 bg-gray-50 text-black">
        <HeaderBarAdmin handleSidebarToggle={toggleSidebar} />
        <SideBarAdmin
          mobileSidebarOpen={mobileSidebarOpen}
        />
        <div className="h-full mt-28 mb-10 md:ml-64">
          <div className="px-12 w-full">
            <div className="main-content flex flex-col flex-grow container">
              <div className="flex flex-wrap">
                <div className="flex w-full flex-col">
                  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 py-4 gap-8 xl:w-full">
                    <div className="flex items-center p-4 sm:p-6 md:p-2 lg:p-6 bg-white shadow rounded-lg border-b-4 border-b-[#9d47ec] transition-all duration-700 hover:scale-110 cursor-pointer">
                      <div className="inline-flex flex-shrink-0 items-center justify-center h-12 w-12 text-purple-600 bg-purple-100 rounded-full mr-3">
                        <HiOutlineUserGroup size={24} />
                      </div>
                      <div>
                        <div className="flex-grow flex flex-col justify-center">
                          <span className="block text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold pl-6">
                            {studentList.length}
                          </span>
                          <span className="block text-base sm:text-xs md:text-xs lg:text-base xl:text-base  text-gray-500 pl-6">
                            นักเรียนทั้งหมด
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 sm:p-6 md:p-2 lg:p-6 bg-white shadow rounded-lg border-b-4 border-b-[#16a34a] transition-all duration-700 hover:scale-110 cursor-pointer">
                      <div className="inline-flex flex-shrink-0 items-center justify-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-green-600 bg-green-100 rounded-full mr-4 sm:mr-5 md:mr-6">
                        <FaChalkboardTeacher size={24} />
                      </div>
                      <div>
                        <span className="block text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold pl-6">
                          {teacherList.length}
                        </span>
                        <span className="block text-base sm:text-xs md:text-xs lg:text-base xl:text-base  text-gray-500 pl-6">
                          ครูทั้งหมด
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center p-4 sm:p-6 md:p-2  lg:p-6 bg-white shadow rounded-lg border-b-4 border-b-[#1D4ED8] transition-all duration-700 hover:scale-110 cursor-pointer">
                      <div className="inline-flex flex-shrink-0 items-center justify-center h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-blue-600 bg-blue-100 rounded-full mr-4 sm:mr-5 md:mr-6">
                        <BsBook size={24} />
                      </div>
                      <div>
                        <span className="block text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold pl-6">
                          {courseList.length}
                        </span>
                        <span className="block text-base sm:text-xs md:text-xs lg:text-base xl:text-base  text-gray-500 pl-6">
                          รายวิชาทั้งหมด
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-5 pb-2">
              <p className="text-gray-700 sm:text-base md:text-lg lg:text-xl xl:text-2xl px-3 border-l-4 border-blue-400">
                รายชื่อคุณครู
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 py-4 gap-8 xl:w-full">
              {teacherList.map((teacher, index) => (
                <div
                  // onClick={() => {
                  //   teacherModal(teacher);
                  // }}
                >
                  <AdminTeacherCard key={index} teacher={teacher} />
                </div>
              ))}
            </div>
            <Modal size={"4xl"} isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalBody>
                      <InfoTeacher teacher={teacher} />
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
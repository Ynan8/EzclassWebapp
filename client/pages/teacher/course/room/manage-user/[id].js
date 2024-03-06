import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import SidebarTeacherRoom from '../../../../../components/Sidebar/SidebarTeacherRoom';
import { FaEdit, FaFileExcel, FaPlus, FaTrash } from 'react-icons/fa';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import UploadStudentFile from '../../../../../components/Modals/UploadStudentFile';
import axios from 'axios';


const ManageUser = () => {
  // Show Course Year
  const router = useRouter();
  const { id } = router.query;

  const { isOpen: isOpenModalExcel, onOpen: onOpenModalExcel, onOpenChange: onOpenChangeModalExcel } = useDisclosure();
  const { isOpen: isOpenModalStudent, onOpen: onOpenModalStudent, onOpenChange: onOpenChangeModalStudent } = useDisclosure();

  const [student, setStudent] = useState([]);

  const loadStudentCourse = async () => {
    if (id) {
      try {
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
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
        <SidebarTeacherRoom id={id} />
        <div className="h-full ml-20 mt-28 mb-10 md:ml-64">
          {/* BreadCrubm */}
          <div className="px-10">

          </div>
          <main className="flex-1 mt-10 pb-16 sm:pb-32">
            <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">
              <div class="bg-white rounded py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between px-4">
                  <p className='text-2xl font-semibold'>ข้อมูลนักเรียน</p>
                  <div className="flex ml-auto">
                    <Button
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


                  {/* <Modal
                    open={visibleFile}
                    width={1000}
                    onCancel={() => {
                      setVisibleFile(false);
                    }}
                    footer={null}
                    closable={false}
                    centered
                    styles={{ maxHeight: '70vh', overflowY: 'auto' }}
                  >
                    <UploadFile
                      courseRoomId={id}
                      setVisibleFile={setVisibleFile}
                      loadStudentCourse={loadStudentCourse}
                    />
                  </Modal>
                  <Modal
                    open={visibleAddStd}
                    width={600}
                    onCancel={() => setVisibleAddStd(false)}
                    footer={null}
                    closable={false}
                    centered
                    styles={{ maxHeight: '70vh', overflowY: 'auto' }}

                  >
                    <AddStudent

                    />
                  </Modal> */}

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
                            <div class="flex items-center duration-200 hover:text-yellow-500 justify-center w-full py-4 cursor-pointer">
                              <FaEdit size={25} />
                            </div>
                            <div class="flex items-center duration-200 hover:text-red-500 justify-center w-full py-4 cursor-pointer">
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
              />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ManageUser
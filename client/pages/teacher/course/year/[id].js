import React, { useEffect, useState } from 'react'
import { Breadcrumbs, BreadcrumbItem, Tabs, Tab, DropdownSection, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, Skeleton } from "@nextui-org/react";
import HeaderBarTeacher from '../../../../components/HeaderBar/HeaderBarTeacher';
import AddCourseYear from '../../../../components/Modals/AddCourseYear';
import Image from 'next/image';
import { AiOutlinePlus } from 'react-icons/ai';
import bgYearAdd from '../../../../public/bgYearAdd.png'
import bgYear from '../../../../public/bgYear.png'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { Modal, ModalContent, useDisclosure, Link } from "@nextui-org/react";
import { useRouter } from 'next/router';
import axios from 'axios';
import UpdateCourseYear from '../../../../components/Modals/UpdateCourseYear';
import toast from 'react-hot-toast';


const TeacherCourse = () => {
    const { isOpen: isOpenModalCreate, onOpen: onOpenModalCreate, onOpenChange: onOpenChangeModalCreate } = useDisclosure();
    const { isOpen: isOpenModalUpdate, onOpen: onOpenModalUpdate, onOpenChange: onOpenChangeModalUpdate } = useDisclosure();
    const { isOpen: isOpenModalDelete, onOpen: onOpenModalDelete, onOpenChange: onOpenChangeModalDelete } = useDisclosure();
    const { isOpen: isOpenModalApprove, onOpen: onOpenModalApprove, onOpenChange: onOpenChangeModalApprove } = useDisclosure();
    const { isOpen: isOpenModalCancel, onOpen: onOpenModalCancel, onOpenChange: onOpenChangeModalCancel } = useDisclosure();
    const { isOpen: isOpenModalDuplicate, onOpen: onOpenModalDuplicate, onOpenChange: onOpenChangeModalDuplicate } = useDisclosure();

    const [isLoading, setIsLoading] = useState(true);
    const [selectedYearId, setSelectedYearId] = useState("");

    // Load course 
    const [course, setCourse] = useState({});

    const router = useRouter();
    const { id } = router.query;



    useEffect(() => {
        if (id) {
            loadCourse();
        }
    }, [id]);


    const loadCourse = async () => {
        if (id) {
            setIsLoading(true);
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/course/${id}`);
                setCourse(data);
            } catch (error) {
                console.error("Error loading course:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };


    // Show Course Year
    const [courseYear, setCourseYear] = useState([])
    useEffect(() => {
        loadCourseYear()
    }, [id])

    const loadCourseYear = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/courseYear/${id}`);
            setCourseYear(data);
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Update courseYear
    const [currentCourseYear, setCurrentCourseYear] = useState({});




    // Delete Course Year
    const [courseYearId, setCourseYearId] = useState("");

    const openDeleteModal = (id) => {
        setCourseYearId(id);
        onOpenModalDelete();
    };

    const handleDeleteCourseYear = async (courseYearId) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/delete-courseYear/${courseYearId}`);

            toast.success('ลบปีการศึกษาสำเร็จ');
            loadCourseYear();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('ไม่สามารถลบปีการศึกษาได้');
        }
    };



    //Keep Course Year
    const openApproveModal = (id) => {
        setCourseYearId(id);
        onOpenModalApprove();
    };

    //Cancel Keep Course Year
    const openCancelModal = (id) => {
        setCourseYearId(id);
        onOpenModalCancel();
    };
    // Duplicate modal
    const openDuplicateModal = (id) => {
        setCourseYearId(id);
        onOpenModalDuplicate();
    };

    const handleArchivedCourseYear = async (courseYearId) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API}/archived-courseYear/${courseYearId}`);
            toast.success('จัดเก็บปีการศึกษาสำเร็จ');
            loadCourseYear();
        } catch (error) {
            console.error('Error canceling:', error);
            toast.error('ไม่สามารถจัดเก็บปีการศึกษา ลองอีกครั้ง!!');
        }
    };



    const handleCancelArchivedCourseYear = async (courseYearId) => {
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API}/cancel-archived-courseYear/${courseYearId}`);

            toast.success('ยกเลิกจัดเก็บปีการศึกษาสำเร็จ');
            loadCourseYear();
        } catch (error) {
            console.error('Error canceling:', error);
            toast.error('ไม่สามารถยกเลิกจัดเก็บปีการศึกษา ลองอีกครั้ง!!');
        }
    };

    const handleDuplicateCourseYear = async (courseYearId) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API}/duplicate-courseYear/${courseYearId}`);
            toast.success('ปีการศึกษาถูกคัดลอกสำเร็จ');
            loadCourseYear();
        } catch (error) {
            console.error('Error duplicating course year:', error);
            toast.error('ไม่สามารถคัดลอกปีการศึกษาได้');
        }
    };




    return (
        <div>
            <div className="min-h-screen flex flex-col flex-auto bg-gray-50 text-black ">
                <HeaderBarTeacher />
                <div className="h-full mt-20 mb-2">
                    <div className="pl-10  mb-6">
                        {/* Breadcrumbs */}
                        <Breadcrumbs size='lg'>
                            <BreadcrumbItem>หน้าหลัก</BreadcrumbItem>
                            <BreadcrumbItem>{course.courseName} ม.{course.level}</BreadcrumbItem>
                            <BreadcrumbItem>เพิ่มปีการศึกษา</BreadcrumbItem>
                        </Breadcrumbs>
                    </div>
                </div>
                <main className="flex-1 pb-16 sm:pb-32">
                    <div className="mx-auto max-w-screen-xl  px-4 sm:px-6 xl:px-12">

                        <div className=" rounded py-4  md:py-7 px-4 md:px-8 xl:px-10">
                            {/* Skeleton Loading */}
                            {isLoading ? (
                                <div className="w-full flex items-center gap-3">
                                    <Skeleton className="flex rounded-full w-32 h-32" />
                                    <div className="w-full flex flex-col gap-2">
                                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                                    </div>
                                </div>
                            ) : (
                                < div
                                    className="relative flex flex-col md:flex-row md:space-x-5 space-y-4 md:space-y-0 rounded-lg p-3 border border-gray-200 bg-white"
                                >
                                    <div className="w-full md:w-1/4 bg-white grid place-items-center">
                                        {course && course.image && (
                                            <img
                                                className="object-cover rounded"
                                                src={course.image.Location}
                                                alt={course.courseName}
                                            />
                                        )}
                                    </div>
                                    <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                                        <h3 className="font-black md:text-2xl text-xl">
                                            {course.courseNo} : {course.courseName}
                                        </h3>
                                        <div className="flex mt-4">
                                            <p className="md:text-lg  text-base"><span className='font-black' >ระดับชั้น :</span> <span className='text-gray-600' >มัธยมศึกษาปีที่ {course.level}</span>  </p>
                                        </div>
                                        <p className="md:text-lg text-gray-600 text-base">{course.detail}</p>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-4 my-8 mt-4">
                                <Tabs size={"lg"} aria-label="Tabs sizes">
                                    <Tab key="active" title="ปีการศึกษาปัจจุบัน" >
                                        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
                                            <div
                                                onClick={onOpenModalCreate}
                                                className="cursor-pointer  bg-white shadow-md border rounded-xl overflow-hidden hover:text-blue-500 "
                                            >
                                                <div className="h-full w-full relative">
                                                    <Image
                                                        alt='addCourseYear'
                                                        className="w-full h-full object-cover rounded-t"
                                                        src={bgYearAdd} />
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                        <div className="flex flex-col items-center justify-center space-y-2">
                                                            <p className="text-xl"><AiOutlinePlus size={45} /></p>
                                                            <p className="text-2xl">เพิ่มปีการศึกษา</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {isLoading ? (
                                                <>
                                                    {
                                                        Array.from({ length: 3 }).map((_, index) => (
                                                            <Card className="w-[250px] h-[360px] space-y-5 p-4" radius="lg" key={index}>
                                                                <Skeleton className="rounded-lg">
                                                                    <div className=" h-72 rounded-lg bg-default-300"></div>
                                                                </Skeleton>
                                                            </Card>
                                                        ))
                                                    }
                                                </>
                                            ) : (
                                                courseYear && courseYear
                                                    .filter(courseYear => courseYear.status === true)
                                                    .map(yearData => (
                                                        <Card key={yearData._id} className="py-3">
                                                            <CardHeader className="flex-col items-start">
                                                                <div className="absolute top-0 right-0 m-2">
                                                                    <Dropdown>
                                                                        <DropdownTrigger>
                                                                            <Button
                                                                                size='sm'
                                                                                variant="light"
                                                                                startContent={<BsThreeDotsVertical size={18} />}
                                                                            />
                                                                        </DropdownTrigger>
                                                                        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                                            <DropdownSection showDivider>
                                                                                <DropdownItem
                                                                                    key="edit"
                                                                                    onClick={() => {
                                                                                        onOpenModalUpdate();
                                                                                        setCurrentCourseYear(yearData);
                                                                                    }}
                                                                                >
                                                                                    <p>แก้ไข</p>
                                                                                </DropdownItem>


                                                                                <DropdownItem
                                                                                >
                                                                                    <p onClick={() => openApproveModal(yearData._id)}>จัดเก็บ</p>
                                                                                </DropdownItem>
                                                                                <DropdownItem

                                                                                    key="duplicate" onClick={() => openDuplicateModal(yearData._id)}>
                                                                                    <p>คัดลอกปีการศึกษา</p>
                                                                                </DropdownItem>

                                                                            </DropdownSection>
                                                                            <DropdownSection>
                                                                                <DropdownItem
                                                                                    key="delete"
                                                                                    className="text-danger"
                                                                                    color="danger"
                                                                                    onPress={onOpenModalDelete}
                                                                                >
                                                                                    <p onClick={() => openDeleteModal(yearData._id)}>
                                                                                        ลบปีการศึกษา
                                                                                    </p>
                                                                                </DropdownItem>
                                                                            </DropdownSection>
                                                                        </DropdownMenu>
                                                                    </Dropdown>
                                                                </div>
                                                            </CardHeader>
                                                            <Link href={`/teacher/course/room/${yearData._id}`} className="pointer">

                                                                <CardBody className="overflow-visible ">

                                                                    <Image
                                                                        alt="Card background"
                                                                        className="object-cover rounded-xl"
                                                                        src={bgYear}
                                                                    />
                                                                    <div className="absolute inset-x-0 bottom-0 mb-10 flex flex-col items-center justify-center text-white">
                                                                        <p className="text-3xl">ปีการศึกษา</p>
                                                                        <p className="text-6xl font-semibold">{yearData.year}</p>
                                                                    </div>
                                                                </CardBody>
                                                            </Link>
                                                        </Card>
                                                    ))
                                            )}

                                        </div>
                                    </Tab>

                                    <Tab key="courseYear" title="ปีการศึกษาที่จัดเก็บ" >
                                        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
                                            {isLoading ? (
                                                <>
                                                    {
                                                        Array.from({ length: 3 }).map((_, index) => (
                                                            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-10">
                                                                <Card className="w-[250px] h-[360px] space-y-5 p-4" radius="lg" key={index}>
                                                                    <Skeleton className="rounded-lg">
                                                                        <div className=" h-72 rounded-lg bg-default-300"></div>
                                                                    </Skeleton>
                                                                </Card>
                                                            </div>

                                                        ))
                                                    }
                                                </>
                                            ) : (
                                                courseYear && courseYear
                                                    .filter(courseYear => courseYear.status === false)
                                                    .length > 0 ? (
                                                    courseYear
                                                        .filter(courseYear => courseYear.status === false)
                                                        .map(yearData => (

                                                            <Card key={yearData._id} className="py-3">
                                                                <CardHeader className="flex-col items-start">
                                                                    <div className="absolute top-0 right-0 m-2">
                                                                        <Dropdown>
                                                                            <DropdownTrigger>
                                                                                <Button
                                                                                    size='sm'
                                                                                    variant="light"
                                                                                    startContent={<BsThreeDotsVertical size={18} />}
                                                                                />
                                                                            </DropdownTrigger>
                                                                            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                                                                                <DropdownSection showDivider>
                                                                                    <DropdownItem
                                                                                        key="edit"
                                                                                        onClick={() => {
                                                                                            onOpenModalUpdate();
                                                                                            setCurrentCourseYear(yearData);
                                                                                        }}
                                                                                    >
                                                                                        <p>แก้ไข</p>
                                                                                    </DropdownItem>


                                                                                    <DropdownItem onClick={() => openCancelModal(yearData._id)} key="archived">
                                                                                        <p>ยกเลิกจัดเก็บ</p>
                                                                                    </DropdownItem>
                                                                                    <DropdownItem key="duplicate" onClick={() => openDuplicateModal(yearData._id)}>
                                                                                        <p>คัดลอกปีการศึกษา</p>
                                                                                    </DropdownItem>
                                                                                </DropdownSection>
                                                                                <DropdownSection>
                                                                                    <DropdownItem
                                                                                        key="delete"
                                                                                        className="text-danger"
                                                                                        color="danger"
                                                                                        onPress={onOpenModalDelete}
                                                                                    >
                                                                                        <p onClick={() => openDeleteModal(yearData._id)}>
                                                                                            ลบปีการศึกษา
                                                                                        </p>
                                                                                    </DropdownItem>
                                                                                </DropdownSection>
                                                                            </DropdownMenu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </CardHeader>
                                                                <Link href={`/teacher/course/room/${yearData._id}`} className="pointer">

                                                                    <CardBody className="overflow-visible ">
                                                                        <Image
                                                                            alt="Card background"
                                                                            className="object-cover rounded-xl"
                                                                            src={bgYear}
                                                                        />
                                                                        <div className="absolute inset-x-0 bottom-0 mb-10 flex flex-col items-center justify-center text-white">
                                                                            <p className="text-3xl">ปีการศึกษา</p>
                                                                            <p className="text-6xl font-semibold">{yearData.year}</p>
                                                                        </div>
                                                                    </CardBody>
                                                                </Link>
                                                            </Card>
                                                        ))
                                                ) : (
                                                    <p className='text-center text-xl'>ไม่มีรายปีการศึกษาที่จัดเก็บ</p> // You can render something else if the filtered array is empty
                                                )
                                            )}
                                        </div>
                                    </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </main >
            </div >
            {/*Create */}
            < Modal
                isOpen={isOpenModalCreate}
                onOpenChange={onOpenChangeModalCreate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <AddCourseYear
                            courseId={id}
                            onClose={onClose}
                            loadCourseYear={loadCourseYear}
                        />
                    )}
                </ModalContent>
            </Modal >

            {/* Update */}
            < Modal
                isOpen={isOpenModalUpdate}
                onOpenChange={onOpenChangeModalUpdate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <UpdateCourseYear
                            yearId={selectedYearId}
                            onClose={onClose}
                            loadCourseYear={loadCourseYear}
                            currentCourseYear={currentCourseYear}
                            setCurrentCourseYear={setCurrentCourseYear}
                        />
                    )}
                </ModalContent>
            </Modal >

            {/* Delete */}
            < Modal
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
                                    คุณต้องลบปีการศึกษาหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบปีการศึกษาจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="danger" onPress={onClose} onClick={() => handleDeleteCourseYear(courseYearId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >

            {/* Approve Keep */}
            < Modal
                isOpen={isOpenModalApprove}
                onOpenChange={onOpenChangeModalApprove}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องการจัดเก็บปีการศึกษาหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การจัดเก็บปีการศึกษานี้จะย้ายไปที่ปีการศึกษาที่จัดเก็บของคุณ  คุณสามารถยกเลิกจัดเก็บปีการศึกษาได้
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => handleArchivedCourseYear(courseYearId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
            {/* Cancel  */}
            < Modal
                isOpen={isOpenModalCancel}
                onOpenChange={onOpenChangeModalCancel}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องยกเลิกการจัดเก็บปีการศึกษาหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    การลบปีการศึกษาจะไม่สามารถกู้คืนได้ แน่ใจหรือไม่ว่าต้องการดำเนินการต่อ ?
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => handleCancelArchivedCourseYear(courseYearId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
            {/* Duplicate  */}
            < Modal
                size='lg'
                isOpen={isOpenModalDuplicate}
                onOpenChange={onOpenChangeModalDuplicate}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    คุณต้องการคัดลอกปีการศึกษาหรือไม่ ?
                                </p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-base text-gray-500">
                                    ทุกข้อมูลของปีการศึกษาต้นฉบับ จะถูกคัดลอกมาไว้ในการ์ดปีการศึกษา ยกเว้นข้อมูลของนักเรียน
                                    ในห้องเรียน ดังนั้นต้องทำการ เพิ่มนักเรียนใหม่ เข้ารายวิชาทุกครั้ง
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="primary" onPress={onClose} onClick={() => handleDuplicateCourseYear(courseYearId)}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </div >
    )
}

export default TeacherCourse
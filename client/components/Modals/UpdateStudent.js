import { Button, Input, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const UpdateStudent = ({
    onClose,
    currentStd,
    setCurrentStd,
    loadDataStd,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleUpdateStd = async () => {
        // Additional validation
        if (!currentStd.username.trim() || /\s/.test(currentStd.username)) {
            toast.error("รหัสนักเรียนไม่ควรมีช่องว่าง");
            return;
        }

        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/student/${currentStd._id}`,
                {
                    firstName: currentStd.firstName,
                    lastName: currentStd.lastName,
                    username: currentStd.username,
                    password: currentStd.password,
                }
            );
            toast.success("แก้ไขข้อมูลนักเรียนสำเร็จ");
            onClose();
            loadDataStd();
        } catch (error) {
            console.error(error);
            toast.error("ไม่สามารถแก้ไขข้อมูลนักเรียนได้");
        }
    };
    return (
        <>
            <div>
                <ModalHeader className="flex flex-col gap-1">แก้ไขข้อมูลนักเรียน</ModalHeader>
                <ModalBody>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <Input
                            isRequired
                            size="lg"
                            type="text"
                            label="รหัสนักเรียน"
                            placeholder="เช่น 21380"
                            variant="bordered"
                            value={currentStd.username}
                            onChange={(e) =>
                                setCurrentStd({ ...currentStd, username: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <Input
                            isRequired
                            size="lg"
                            type="text"
                            label="ชื่อ"
                            placeholder="เช่น นันฐวุฒิ"
                            variant="bordered"
                            value={currentStd.firstName}
                            onChange={(e) =>
                                setCurrentStd({ ...currentStd, firstName: e.target.value })
                            }
                        />
                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <Input
                            isRequired
                            size="lg"
                            type="text"
                            label="นามสกุล"
                            placeholder="เช่น ต้นสวรรค์"
                            variant="bordered"
                            value={currentStd.lastName}
                            onChange={(e) =>
                                setCurrentStd({ ...currentStd, lastName: e.target.value })
                            }

                        />
                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <Input
                            size="lg"
                            label="รหัสผ่าน"
                            variant="bordered"
                            placeholder="กรอกรหัสผ่าน"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            value={currentStd.password}
                            onChange={(e) =>
                                setCurrentStd({ ...currentStd, password: e.target.value })
                            }
                        />
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        ยกเลิก
                    </Button>
                    <Button onClick={handleUpdateStd} color="primary" onPress={onClose}>
                        บันทึก
                    </Button>
                </ModalFooter>
            </div >
        </>
    );
};

export default UpdateStudent;
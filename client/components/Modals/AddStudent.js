import { Button, Input, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const AddStudent = ({
    onClose,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    password,
    setPassword,
    loadDataStd,
    id,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Basic validation
        if (!firstName || !lastName || !username || !password) {
            toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
    
        // Additional validation
        if (!username.trim() || /\s/.test(username)) { // Check for white spaces
            toast.error("รหัสนักเรียนไม่ควรมีช่องว่าง");
            return;
        }
    
        if (password.length < 4) {
            toast.error("รหัสผ่านต้องมีอย่างน้อย 4 ตัว");
            return;
        }
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-student`, {
                firstName,
                lastName,
                username,
                password,
            });
            setFirstName('');
            setLastName('');
            setUsername('');
            setPassword('');
            toast.success("เพิ่มนักเรียนสำเร็จ");
            loadDataStd();
            onClose();
        } catch (error) {
            console.error("Error adding student :", error);
            if (error.response) {
                toast.error(error.response.data);
            } else {
                toast.error("มีข้อผิดพลาดเกิดขึ้น");
            }
        }
    };
    

    return (
        <>
            <div>
                <ModalHeader className="flex flex-col gap-1">เพิ่มนักเรียน</ModalHeader>
                <ModalBody>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <Input
                            isRequired
                            size="lg"
                            type="text"
                            label="รหัสนักเรียน"
                            placeholder="เช่น 21380"
                            variant="bordered"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        ยกเลิก
                    </Button>
                    <Button onClick={handleSubmit} color="primary" >
                        บันทึก
                    </Button>
                </ModalFooter>
            </div >
        </>
    );
};

export default AddStudent;
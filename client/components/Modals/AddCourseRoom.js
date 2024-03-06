import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

const AddCourseRoom = ({
    onClose,
    courseYearId,
     loadCourseRoom

}) => {

    const [roomName, setRoomName] = useState('');


    const handleInputChange = (e) => {
        setRoomName(e.target.value);
    };





    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-courseRoom`, {
                courseYearId,
                roomName,
            });
             loadCourseRoom()
            toast.success("เพิ่มห้องเรียนสำเร็จ");
            setRoomName("")
        } catch (error) {
            console.error("Error adding courseRoom:", error);
            toast.error("ไม่สามารถเพิ่มห้องเรียนได้");
        }
    };

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">สร้างห้องเรียน</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    value={roomName}
                    onChange={handleInputChange}
                    placeholder="เช่น ม.1/1"
                    variant="bordered"
                />

            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleSubmit} color="primary" onPress={onClose}>
                    ยืนยัน
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddCourseRoom
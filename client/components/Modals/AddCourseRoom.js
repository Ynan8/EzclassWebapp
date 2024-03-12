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

        // Basic validation
        if (!roomName.trim()) {
            toast.error("กรุณากรอกชื่อห้องเรียน");
            return;
        }
      
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-courseRoom`, {
                courseYearId,
                roomName,
            });
            loadCourseRoom();
            toast.success("เพิ่มห้องเรียนสำเร็จ");
            onClose(); // Close the modal only if the request is successful
            setRoomName("");
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
                    maxLength={10}
                    autoFocus
                    value={roomName}
                    onChange={handleInputChange}
                    placeholder="เช่น ม.1/1"
                    variant="bordered"
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                    {roomName.length}/10
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleSubmit} color="primary" >
                    ยืนยัน
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddCourseRoom
import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

const UpdateCourseYear = ({
    onClose,
    courseId,
    loadCourseYear,
    currentCourseYear,
    setCurrentCourseYear,

}) => {

    const handleUpdateCourseYear = async (e) => {
        const trimmedYear = currentCourseYear.year.trim();

     
        if (!trimmedYear || trimmedYear.length !== 4) {
            toast.error("กรุณากรอกปีการศึกษาให้ถูกต้อง 4 ตัว");
            return;
        }

        try {
            const { data } = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/courseYear/${currentCourseYear._id}`,
                { ...currentCourseYear, year: trimmedYear } 
            );
            loadCourseYear();
            toast.success("แก้ไขปีการศึกษาสำเร็จ");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("ไม่สามารถแก้ไขปีการศึกษาได้");
        }
    };

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">แก้ไขปีการศึกษา</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    onChange={(e) => setCurrentCourseYear({ ...currentCourseYear, year: e.target.value })}
                    placeholder="เช่น 2567"
                    variant="bordered"
                    value={currentCourseYear.year}
                    maxLength={4}
                />
                <div className="ml-auto flex  space-x-4 mt-1">
                    <p className="text-gray-500 text-xs">{currentCourseYear.year.length}/4</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleUpdateCourseYear} color="primary" >
                    บันทึก
                </Button>
            </ModalFooter>
        </div>
    )
}

export default UpdateCourseYear
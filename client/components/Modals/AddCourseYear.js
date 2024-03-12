import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";

const AddCourseYear = ({
    onClose,
    courseId,
    loadCourseYear
}) => {

    const [values, setValues] = useState({
        year: ""
    });

    const handleYearChange = (event) => {
        setValues({ ...values, year: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Basic validation
        if (!values.year || values.year.length !== 4) {
            toast.error("กรุณากรอกปีการศึกษาให้ถูกต้อง (4 ตัวอักษร)");
            return;
        }
    
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-courseYear`, {
                courseId,
                ...values,
            });
            toast.success("เพิ่มปีการศึกษาสำเร็จ");
            setValues({
                year: "",
            });
            loadCourseYear();
            onClose(); // Close the modal only if the request is successful
        } catch (error) {
            console.error("Error adding course year:", error);
            toast.error("ไม่สามารถเพิ่มปีการศึกษาได้");
        }
    };
    
    

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">เพิ่มปีการศึกษา</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    onChange={handleYearChange}
                    placeholder="เช่น 2567"
                    variant="bordered"
                    maxLength={4}
                    value={values.year}
                />
                <div className="ml-auto flex  space-x-4 mt-1">
                    <p className="text-gray-500 text-xs">{values.year.length}/4</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleSubmit} color="primary" >
                    เพิ่ม
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddCourseYear;

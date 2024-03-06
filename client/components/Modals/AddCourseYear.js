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
        } catch (error) {
            console.error("Error adding classroom:", error);
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
                    maxLength={6}
                    value={values.year}
                />
                <div className="ml-auto flex  space-x-4 mt-1">
                    <p className="text-gray-500 text-xs">{values.year.length}/6</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button onClick={handleSubmit} color="primary" onPress={onClose}>
                    เพิ่ม
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddCourseYear;

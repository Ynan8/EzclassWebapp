import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {
    Button, Input, ModalBody, ModalFooter, ModalHeader, ModalContent, Autocomplete, AutocompleteItem, Avatar,
} from "@nextui-org/react";

export default function AddStudentRoom({
    studentList,
    id,
    loadStudentCourse,
    onClose,
}) {
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleSelectStudent = (value) => {
        setSelectedStudent(value)
    };

    const handleSubmit = async () => {
        // Check if a student is selected
        if (!selectedStudent) {
            toast.error("กรุณาเลือกนักเรียน");
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-student/${id}`, {
                selectedStudent,
            });
            toast.success("เพิ่มนักเรียนสำเร็จ");
            loadStudentCourse();
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
        <div>
            <Autocomplete
                defaultItems={studentList}
                variant="bordered"
                label="เพิ่มชื่อหรือรหัสนักเรียน"
                placeholder=""
                labelPlacement="inside"
                className="max-w"

            >
                {(user) => (
                    <AutocompleteItem
                        key={user._id}
                        textValue={`${user?.username} ${user?.firstName} ${user?.lastName}`}
                        value={user}
                        onClick={() => handleSelectStudent(user)}
                    >
                        <div className="flex gap-2 items-center">
                            <Avatar
                                alt={`${user?.firstName} ${user?.lastName}`}
                                className="flex-shrink-0"
                                size="sm"
                                src={user.image ? user.image.Location : ""}
                            />
                            <div className="flex flex-col">
                                <span className="text-small">{user.firstName} {user.lastName}</span>
                                <span className="text-tiny text-default-400">{user.username}</span>
                            </div>
                        </div>
                    </AutocompleteItem>
                )}
            </Autocomplete>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                    บันทึก
                </Button>
            </ModalFooter>
        </div>
    );
}

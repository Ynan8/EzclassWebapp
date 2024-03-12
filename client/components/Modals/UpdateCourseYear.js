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
    handleUpdateCourseYear,

}) => {

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
                    เพิ่ม
                </Button>
            </ModalFooter>
        </div>
    )
}

export default UpdateCourseYear
import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

const AddCourseYear = ({
    onClose
}) => {
    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">เพิ่มปีการศึกษา</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    placeholder="เพิ่มปีการศึกษา"
                    variant="bordered"
                />

            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button color="primary" onPress={onClose}>
                    เพิ่ม
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddCourseYear
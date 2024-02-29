import { Button, Input, ModalBody, ModalFooter, ModalHeader } from '@nextui-org/react'
import React from 'react'

const AddSection = ({
    onClose
}) => {
    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">สร้างบทเรียน</ModalHeader>
            <ModalBody>
                <Input
                    autoFocus
                    placeholder="ชื่อบทเรียน"
                    variant="bordered"
                    focus={{ borderColor: 'primary' }}
                />

            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button color="primary" onPress={onClose}>
                    บันทึก
                </Button>
            </ModalFooter>
        </div>
    )
}

export default AddSection
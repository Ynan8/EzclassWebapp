import { Button, Input, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import React from "react";

const UpdateTeacher = ({
    onClose,
    currentTch,
    setCurrentTch,
    handleUpdateTch,
}) => {
    return (
        <>

            <div>
                <ModalHeader className="flex flex-col gap-1">เพิ่มผู้สอน</ModalHeader>
                <ModalBody>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label
                            className="block text-base font-medium text-[#07074D]"
                            for="grid-first-name"
                        >
                            รหัสผู้สอน <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="appearance-none block w-full  text-gray-700  border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-blue-500 border-2"
                            type="text"
                            placeholder="เช่น 21380"
                            value={currentTch.username}
                            onChange={(e) =>
                                setCurrentTch({ ...currentTch, username: e.target.value })
                              }
                        />
                    </div>
                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label
                            className="block text-base font-medium text-[#07074D]"
                            for="grid-first-name"
                        >
                            ชื่อ <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="appearance-none block w-full  text-gray-700  border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-blue-500 border-2"
                            type="text"
                            placeholder="เช่น นันฐวุฒิ"
                            value={currentTch.firstName}
                            onChange={(e) =>
                                setCurrentTch({ ...currentTch, firstName: e.target.value })
                              }
                        />
                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <label
                            className="block text-base font-medium text-[#07074D]"
                            for="grid-last-name"
                        >
                            นามสกุล <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="appearance-none block w-full  text-gray-700  border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-blue-500 border-2"
                            type="text"
                            placeholder="เช่น ต้นสวรรค์"
                            value={currentTch.lastName}
                            onChange={(e) =>
                                setCurrentTch({ ...currentTch, lastName: e.target.value })
                              }
                        />
                    </div>

                    <div className="w-full  px-3 mb-6 md:mb-0">
                        <input
                            class="appearance-none block w-full  text-gray-700  border-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-blue-500 border-2"
                            type="password"
                            placeholder="กรอกรหัสผ่าน"
                            value={currentTch.password}
                            onChange={(e) =>
                                setCurrentTch({ ...currentTch, password: e.target.value })
                              }
                        />
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        ยกเลิก
                    </Button>
                    <Button onClick={handleUpdateTch} color="primary">
                        บันทึก
                    </Button>
                </ModalFooter>
            </div >
        </>
    );
};

export default UpdateTeacher;
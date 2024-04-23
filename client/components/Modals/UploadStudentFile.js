import { ModalBody, ModalFooter, ModalHeader, Button } from '@nextui-org/react'
import React, { useRef, useState } from 'react'
import { AiOutlineUpload } from 'react-icons/ai';
import { FaCloudUploadAlt } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import toast from 'react-hot-toast';

const UploadStudentFile = ({
    onClose,
    // courseRoomId,
    loadDataStd,
}) => {
    const [uploadButtonText, setUploadButtonText] = useState('อัพโหลดไฟล์');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setUploadButtonText(file.name);

        if (!file) {
            return;
        }

        setLoading(true);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });


                setStudents(jsonData);
                setLoading(false);
            } catch (error) {
                console.error('Error parsing Excel file:', error);
                toast.error('Error parsing Excel file. Please check the file format.');
                setLoading(false);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const importStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API}/import-students`, { students });
            console.log(response.data);

            // const existingStudentsUpdated = response.data.students.some((student) => student.message === 'Existing student updated');

            // if (existingStudentsUpdated) {
            //     toast.error('Existing students were updated.');
            // } else {
            toast.success('เพิ่มนักเรียนสำเร็จ');
            onClose(); // Close the modal after successful import
            loadDataStd()
            setLoading(false);
        } catch (error) {
            console.error("Error adding student :", error);
            if (error.response) {
                toast.error(error.response.data);
            } else {
                toast.error("มีข้อผิดพลาดเกิดขึ้น");
            }
        }
    };

    const handleDownloadTemplate = () => {
        const workSheetData = () => {
            const records = [
                {
                    'รหัสนักเรียน': "1001",
                    'ชื่อจริง': "สมชาย",
                    'นามสกุล': "ใจดี",
                    'password': "1001",
                }
            ];
            return records;
        };


        // Generate worksheet
        const workSheet = XLSX.utils.json_to_sheet(workSheetData());
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Template");

        // Generate buffer
        const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });

        // Convert to Blob and save using FileSaver
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(data, 'Template.xlsx');
    };

    return (
        <div>
            <ModalHeader className="flex flex-col gap-1">Import Excel</ModalHeader>
            <ModalBody>
                {/* <p className="text-center text-lg font-semibold mb-4">รายชื่อนักเรียนที่จะถูกเพิ่ม</p> */}
                <div className="mt-4">
                    <table className="w-full ">
                        <thead>
                            <tr className="text-lg font-medium border-b border-gray-200">
                                <td className="py-1 px-4 text-center">รหัสนักเรียน</td>
                                <td className="py-1 px-4 text-center">ชื่อจริง</td>
                                <td className="py-1 px-4 text-center">นามสกุล</td>
                            </tr>
                        </thead>
                        {students.length > 0 && (
                            <tbody className="text-lg">
                                {students.map((student, index) => (
                                    <tr key={index} className="h-10 transition-colors group">
                                        <td className="text-center py-3">{student.รหัสนักเรียน}</td>
                                        <td className="text-center py-3">{student.ชื่อจริง}</td>
                                        <td className="text-center py-3">{student.นามสกุล}</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
                {students.length === 0 && (
                    <div className="flex flex-col item-center justify-center my-6">
                        <p className='text-lg font-semibold mb-1' >
                            วิธีการการนำเข้ารายชื่อนักเรียนด้วยไฟล์ Excel
                        </p>
                        <div className="flex space-y-1 flex-col text-lg justify-center">
                            <p>1.ดาวโหลด <span className='underline cursor-pointer font-semibold hover:text-blue-500 duration-200' onClick={handleDownloadTemplate}>Template</span></p>
                            <p>2.เพิ่มข้อมูลนักเรียน</p>
                            <p>3.บันทึกไฟล์ excel</p>
                            <p>4.อัพโหลดไฟล์ และกดปุ่มบันทึก</p>
                        </div>
                    </div>
                )}
                <div className="flex justify-center items-center mt-4">
                    <Button
                        color="default"
                        variant="bordered"
                        startContent={<FaCloudUploadAlt size={25} />}
                        onClick={() => fileInputRef.current.click()}
                    >
                        {uploadButtonText}
                    </Button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    ยกเลิก
                </Button>
                <Button color="primary" onPress={importStudents} isLoading={loading}>
                    {loading ? "กำลังโหลด" : "ยืนยัน"}
                </Button>
            </ModalFooter>
        </div>
    )
}

export default UploadStudentFile;

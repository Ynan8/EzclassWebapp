<<<<<<< HEAD
import React, { useContext, useEffect, useRef, useState } from 'react'
import CourseCreateForm from '../../components/Form/CourseCreateForm'
=======
import React, { useRef, useState } from 'react'
import CourseCreateForm from '../../components/form/CourseCreateForm'
>>>>>>> 76bbfa3c88f1859b37a43b21af84ddccd6ba093e
import Link from 'next/link'
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from 'axios';
import Resizer from "react-image-file-resizer"
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router';
import { Context } from '../../context';



const createCourse = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const [values, setValues] = useState({
        courseNo: '',
        courseName: '',
        detail: '',
        level: '',
        uploading: false,
        loading: false,
    });

    const [characterCounts, setCharacterCounts] = useState({
        courseNo: 0,
        courseName: 0,
        detail: 0,
    });

    const router = useRouter()



    const handleLevelChange = (event) => {
        const level = event.target.value;
        setSelectedLevel(level);

        // Update the values state with the selected level
        setValues({
            ...values,
            level: level,
        });
    };


    // select level
    const levels = [
        { label: "มัธยมศึกษาปีที่ 1", value: "1" },
        { label: "มัธยมศึกษาปีที่ 2", value: "2" },
        { label: "มัธยมศึกษาปีที่ 3", value: "3" },
        { label: "มัธยมศึกษาปีที่ 4", value: "4" },
        { label: "มัธยมศึกษาปีที่ 5", value: "5" },
        { label: "มัธยมศึกษาปีที่ 6", value: "6" },
    ];

    //button upload
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // Handle additional logic if needed
    };

    const handleUploadButtonClick = () => {
        // Trigger the file input when the button is clicked
        fileInputRef.current.click();
    };

    //    // image preview
    const [image, setImage] = useState({});
    const [preview, setPreview] = useState('');
    const [imageSelected, setImageSelected] = useState(false);

    const handleImage = (e) => {
        let file = e.target.files[0]
        setPreview(window.URL.createObjectURL(file));
        setValues({ ...values, loading: true });
        // resize
        Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/course/upload-image`, {
                    image: uri,
                });
                console.log("Image uploaded", data);
                // set image in the state
                setImage(data)
                setValues({ ...values, loading: false });
                setImageSelected(true);

            } catch (err) {
                console.log(err)
                setValues({ ...values, loading: false })
                toast.error('Image upload failed. Try later.')
            }
        })
    }


    const handleImageRemove = async () => {
        try {
            // console.log(values);
            setValues({ ...values, loading: true });
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/course/remove-image`, { image });
            setImage({});
            setPreview('');
            setValues({ ...values, loading: false });
        } catch (err) {
            console.log(err);
            setValues({ ...values, loading: false });
            toast.error("Image upload failed. Try later.");
        }
    }



    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'courseName' && value.length > 100) {
            return;
        }

        if (name === 'detail' && value.length > 200) {
            return;
        }

        if (name === 'courseNo' && value.length > 20) {
            return;
        }

        else {
            setValues({
                ...values,
                [name]: value,
            });

            setCharacterCounts({
                ...characterCounts,
                [name]: value.length,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/course`, {
                ...values,
                image,
            });
            toast.success('สร้างรายวิชาสำเร็จ');
             router.push("/teacher/home");
        } catch (err) {
            console.log(err)
            toast.error("ไม่สามารถสร้างรายวิชาได้ กรุณาลองอีกครั้ง!");
        }
    };


    return (
        <div>
            <Link href={"/teacher/home"} >
                <div className="p-2 m-2 w-20">
                    <AiOutlineArrowLeft size={30} />
                </div>
            </Link>
            <div className="mx-auto max-w-screen-lg px-4 pt-2 pb-20 space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl sm:text-3xl font-medium">สร้างรายวิชา </h1>
                </div>
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    levels={levels}
                    handleUploadButtonClick={handleUploadButtonClick}
                    fileInputRef={fileInputRef}
                    handleFileInputChange={handleFileInputChange}
                    handleLevelChange={handleLevelChange}
                    characterCounts={characterCounts}
                    preview={preview}
                    handleImage={handleImage}
                    handleImageRemove={handleImageRemove}
                />
            </div>
        </div>
    )
}

export default createCourse

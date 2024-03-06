import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import { Spinner } from '@nextui-org/react';


const TeacherRoute = ({ children }) => {
    // state
    const [ok, setOk] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchTeacher();
    }, []);

    const fetchTeacher = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-teacher`);
            // console.log(data);
            if (data.ok)
                setOk(true);
        } catch (err) {
            console.log(err);
            setOk(false);
            router.push('/');
        }
    };

    return (
        <>
            {!ok ? (
              
                <Spinner
                className='   transform: scale(3); text-9xl flex h-screen items-center justify-center text-blue-500'
                />
            ) : (
                <>{children}</>
            )}
        </>
    );
}

export default TeacherRoute;

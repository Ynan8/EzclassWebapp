import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import { Spinner } from '@nextui-org/react';


const StudentRoute = ({ children }) => {
    // state
    const [ok, setOk] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchStudent();
    }, []);

    const fetchStudent= async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
              axios.defaults.headers.common['authtoken'] = token;
            }
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-student`);
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
                size='lg'
                className='transform: scale(3); text-9xl flex h-screen items-center justify-center text-blue-500'
                />
            ) : (
                <>{children}</>
            )}
        </>
    );
}

export default StudentRoute;

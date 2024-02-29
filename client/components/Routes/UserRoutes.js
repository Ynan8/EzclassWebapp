import { useState, useEffect } from 'react';
import { Context } from '../../context';
import axios from 'axios';
import { useRouter } from 'next/router';
import { SyncOutlined } from '@ant-design/icons/';
import { Spinner } from '@nextui-org/react';


const UserRoute = ({ children }) => {
    // state
    const [ok, setOk] = useState(false);

    const router = useRouter();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {

            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/current-user`, {

            });
            if (data.ok)
                setOk(true);
        } catch (err) {
            console.log(err);
            setOk(false);
            router.push('/')
        }
    };




    return (
        <>
            {!ok ? (

                <div
                    className='text-9xl flex h-screen items-center justify-center'
                >
                    <Spinner
                    size='lg'
                    />
                </div>

            ) : (
                <>{children}</>
            )}
        </>
    )
}

export default UserRoute;
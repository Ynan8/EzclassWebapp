import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from '../context';
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
    return (
        <NextUIProvider >
            <Provider>
                <Toaster position='top-center' />
                <Component {...pageProps} />
            </Provider>
        </NextUIProvider>


    )
}

export default MyApp;
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from '../context';
import { NextUIProvider } from "@nextui-org/react";

function MyApp({ Component, pageProps }) {
    return (
            <Provider>
            <NextUIProvider>
                <Toaster position='top-center' />
                <Component {...pageProps} />
            </NextUIProvider>
            </Provider>


    )
}

export default MyApp;
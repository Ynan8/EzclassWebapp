import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';
import { Provider } from '../context';

function MyApp({ Component, pageProps }) {
    return (
        <Provider>
            <Toaster position='top-center' />
            <Component {...pageProps} />
        </Provider>

    )
}

export default MyApp;
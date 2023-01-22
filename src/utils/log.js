
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const showMessage = (message,status) => {
    if(status === 'error'){
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    else if(status === 'success'){
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT
        });

    }

};

export default showMessage;


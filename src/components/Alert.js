import { toast } from "react-toastify";
const base = { position: "top-right", theme: "colored", autoClose: 2000 };

const alertError = ( msg ) => {
    toast.error(`${msg}`,{...base})
}

const alertSuccess = ( msg ) => {
    toast.success(`${msg}`,{...base})
}

export { alertError, alertSuccess };
import { useEffect, useState } from "react"
import axiosClient from "../axiosClient"
import AlertModelComponent from "./activate/AlertModelComponent";

export default function LogoutComponent() {
    const [messageAlert, setMessageAlert] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const handleCloseShowAlert = () => {
        setShowAlert(false)
    }

    useEffect(() => {
        axiosClient.post('/logout').then((response) => {
            if (response.data.msg === 'Logged out successfully') {
                sessionStorage.removeItem('access_token')
                sessionStorage.removeItem('info')
                window.location.reload()
            } else {
                setMessageAlert(response.data.msg)
                setShowAlert(true)
            }
        });
    }, [])

    return (
        <AlertModelComponent showAlert={showAlert} handleCloseShowAlert={handleCloseShowAlert} messageAlert={messageAlert} />
    )
}
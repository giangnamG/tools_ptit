import { useEffect, useState } from "react"
import axiosClient from "../../axiosClient"
import { Form, Button, Modal } from 'react-bootstrap'
import SpinnerComponent from "../activate/SpinnerComponent"
import AlertModelComponent from '../activate/AlertModelComponent';

export default function LoginQLDTComponent({ showAccessQlDtFrom, handleCloseQlDtFrom }) {

    const [msv, setMSV] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [alert, setAlert] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState('')

    const handleCloseShowAlert = () => {
        setShowAlert(false)
    }

    const [isLoggedQLDT, setIsLoggedQLDT] = useState(() => {
        let status = sessionStorage.getItem('Access-QLDT')
        if (status === null || status === false)
            return false
        return true
    })
    useEffect(() => {
        if (sessionStorage.getItem('Access-QLDT') === 'false' || sessionStorage.getItem('access_token_qldt') === null) {
            setIsLoggedQLDT(false)
        }
    }, [])

    const access_qldt = () => {
        setSpinner(true)
        axiosClient.post('/login_qldt', {
            msv, password
        }).then((response) => {
            const qldt = response.data
            if (qldt.code === '200') {
                localStorage.setItem('qldt', JSON.stringify({
                    ...qldt,
                    password
                }))
                setMessageAlert('Kết nối thành công, phiên của bạn tồn tại trong 30 phút')
                setShowAlert(true)
                setSpinner(false)
            } else if (qldt.message === "your qldt and account is unique") {
                setMessageAlert('Mỗi tài khoản chỉ được kết nối với một tài khoản QLDT')
                setShowAlert(true)
                setSpinner(false)
            } else {
                setMessageAlert('Kết nối thất bại, tài khoản hoặc mật khẩu không chính xác')
                setShowAlert(true)
                setSpinner(false)
            }
        }).catch((error) => {
            if (error.message === "Request failed with status code 422" || error.message === "Request failed with status code 401") {
                setMessageAlert('Hãy đăng nhập để sử dụng tính năng này')
                setShowAlert(true)
                setSpinner(false)
                const t = setTimeout(() => {
                    window.location.reload()
                    clearTimeout(t)
                }, 2000)
            } else {
                setMessageAlert('No hacking !')
                setShowAlert(true)
                setSpinner(false)
            }
            console.error(error)
        })
    }
    return (
        <>
            <Modal
                show={showAccessQlDtFrom}
                onHide={handleCloseQlDtFrom}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Get Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupMSV">
                            <Form.Label>MSV</Form.Label>
                            <Form.Control onChange={(e) => { setMSV(e.target.value) }} type="text" placeholder="Enter msv" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Password" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {spinner &&
                        (<div >
                            <SpinnerComponent />
                        </div>)
                    }
                    <Button variant="secondary" onClick={handleCloseQlDtFrom}>
                        Close
                    </Button>
                    <Button onClick={access_qldt} variant="primary">Access</Button>
                </Modal.Footer>
            </Modal>
            <AlertModelComponent showAlert={showAlert} handleCloseShowAlert={handleCloseShowAlert} messageAlert={messageAlert} />

        </>
    )
}
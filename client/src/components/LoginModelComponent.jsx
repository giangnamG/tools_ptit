import React, { useState, useRef } from 'react';
import { Button, Modal, Col, Row, Form } from 'react-bootstrap';
import axiosClient from '../axiosClient'
import AlertModelComponent from './activate/AlertModelComponent';
import SpinnerComponent from './activate/SpinnerComponent';

const LoginFormComponent = ({ emailRef, passwordRef }) => {
  return (
    <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control ref={emailRef} type="email" placeholder="email@gmail.com" />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Mật Khẩu
        </Form.Label>
        <Col sm="10">
          <Form.Control ref={passwordRef} type="password" placeholder="Mật Khẩu" />
        </Col>
      </Form.Group>
    </Form>
  );
}

export default function LoginModelComponent({ show, handleClose }) {

  const [spinner, setSpinner] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [messageAlert, setMessageAlert] = useState();
  const [showAlert, setShowAlert] = useState(false)

  const handleCloseShowAlert = () => {
    setShowAlert(false)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setSpinner(true)
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axiosClient.post('/login', {
      email, password
    }).then(response => {
      console.log(response)
      if (response.status === 200) {
        if (response.data.access_token) {
          sessionStorage.setItem('access_token', response.data.access_token)
          setSpinner(false)
          sessionStorage.setItem('info', JSON.stringify({
            'id': response.data.user_info.id,
            'username': response.data.user_info.username,
            'email': response.data.user_info.email,
            'role': response.data.user_info.role,
          }))
          setMessageAlert('Đăng nhập thành công')
          handleClose()
          setShowAlert(true)
          const re = setTimeout(() => {
            window.location.reload()
            clearTimeout(re)
          }, 1000)
        } else if (response.data.message.includes('Logged in as')) {
          setSpinner(false)
          setMessageAlert(response.data.message)
          setShowAlert(true)
        }
      }
    }).catch(error => {
      setSpinner(false)
      console.error(error)
      setMessageAlert('Đăng nhập thất bại -> Invalid credentials')
      setShowAlert(true)
    })
    return
  };
  return (
    <>
      {spinner &&
        (<div>
          <SpinnerComponent />
        </div>)
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{'Đăng Nhập'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginFormComponent emailRef={emailRef} passwordRef={passwordRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {'Thoát'}
          </Button>
          <Button variant="primary" onClick={(e) => { handleLogin(e) }}>
            {'Truy Cập'}
          </Button>
        </Modal.Footer>
      </Modal>
      <AlertModelComponent showAlert={showAlert} handleCloseShowAlert={handleCloseShowAlert} messageAlert={messageAlert} />
    </>
  );
}
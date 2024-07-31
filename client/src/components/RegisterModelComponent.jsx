import React, { useState, useRef } from 'react'
import { Button, Modal, Col, Row, Form } from 'react-bootstrap'
import AlertModelComponent from './activate/AlertModelComponent'
import axiosClient from '../axiosClient'
import SpinnerComponent from './activate/SpinnerComponent'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignText: 'center',
}
const RegisterFormComponent = ({ nameRef, emailRef, passwdRef, cfPasswdRef }) => {
  return (
    <Form >
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextName" style={style}>
        <Col sm="10">
          <Form.Control ref={nameRef} type="text" name='username' placeholder="Tên của bạn? [a-zA-Z0-9]" autoComplete='off' />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail" style={style}>
        <Col sm="10">
          <Form.Control ref={emailRef} type="email" name='email' placeholder="example@gmail.com" autoComplete='Off' />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" style={style}>
        <Col sm="10">
          <Form.Control ref={passwdRef} type="password" name='password' placeholder="Mật Khẩu" autoComplete='off' />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextCfPassword" style={style}>
        <Col sm="10">
          <Form.Control ref={cfPasswdRef} type="password" name='confirmPassword' placeholder="Nhập Lại Mật Khẩu" autoComplete='off' />
        </Col>
      </Form.Group>
    </Form>
  )
}

export default function RegisterModelComponent({ show, handleClose }) {

  const nameRef = useRef()
  const emailRef = useRef()
  const passwdRef = useRef()
  const cfPasswdRef = useRef()

  const [messageAlert, setMessageAlert] = useState()
  const [spinner, setSpinner] = useState(false)
  const [showAlert, setShowAlert] = useState(false)


  const handleSubmit = (e) => {
    e.preventDefault()
    setSpinner(true)
    const re = setTimeout(() => {
      clearTimeout(re)
    }, 4000)
    const username = nameRef.current.value
    const email = emailRef.current.value
    const password = passwdRef.current.value
    const confirmPassword = cfPasswdRef.current.value

    if (password !== confirmPassword) {
      setMessageAlert('Mật Khẩu và Nhập Lại Mật Khẩu phải giống nhau')
      setShowAlert(true)
    } else {
      axiosClient.post('/register', {
        username,
        email,
        password
      }).then((response) => {
        if (response.status === 201 && response.data.message === "User registered successfully") {
          setSpinner(false)
          setMessageAlert('Đăng ký thành công. Vui lòng đăng nhập.')
          setShowAlert(true)
          const re = setTimeout(() => {
            window.location.reload()
            clearTimeout(re)
          }, 1000)
        }
      }).catch((error) => {
        setSpinner(false)
        setMessageAlert('Something went wrong')
        setShowAlert(true)
      })
    }
    setSpinner(false)
    handleClose()
    return
  }

  return (
    <>
      {spinner &&
        (<div>
          <SpinnerComponent />
        </div>)
      }

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo Tài Khoản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterFormComponent
            nameRef={nameRef}
            emailRef={emailRef}
            passwdRef={passwdRef}
            cfPasswdRef={cfPasswdRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button variant="secondary" onClick={handleClose}>
                Thoát
              </Button>
            </Col>
            <Col>
              <Button variant="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
      <AlertModelComponent showAlert={showAlert} handleCloseShowAlert={() => setShowAlert(false)} messageAlert={messageAlert} />
    </>
  )
}

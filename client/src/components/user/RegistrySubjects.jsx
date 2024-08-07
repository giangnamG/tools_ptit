import { useEffect, useState } from "react"
import SpinnerComponent from "../activate/SpinnerComponent"
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import AddSubjectModel from "../activate/AddSubjectModel"
import LoginQLDTComponent from "./LoginQLDTComponent"
import config from "../../config"
import '../../assets/css/fadeIn.css'

export default function RegistrySubjects({ props }) {
    const [showRecordForm, setShowRecordForm] = useState(false)
    const [showAccessQlDtFrom, setShowAccessQlDtFrom] = useState(false)
    const [isAccessQlDt, setIsAccessQlDt] = useState(false)

    const styleTH = {
        backgroundColor: config.app.styles.sideBarColor, color: '#adb5bd'
    }
    useEffect(() => {
        try {
            const token = JSON.parse(localStorage.getItem('qldt')).access_token
            const base64decode = atob(token.split('.')[1])
            const exp = JSON.parse(base64decode).exp
            const now = new Date();
            const currentTimeInSeconds = Math.floor(now.getTime() / 1000);
            console.log(exp, currentTimeInSeconds)
            if (currentTimeInSeconds < exp)
                setIsAccessQlDt(true)
            else {
                setIsAccessQlDt(false)
                localStorage.removeItem('qldt')
            }
        } catch (err) {
            setIsAccessQlDt(false)
            localStorage.removeItem('qldt')
        }
    }, [])

    const handleCloseQlDtFrom = () => {
        setShowAccessQlDtFrom(false)
    }

    return (
        <>
            {
                showRecordForm && (<AddSubjectModel showRecordForm={showRecordForm} setShowRecordForm={setShowRecordForm} />)
            }
            {
                showAccessQlDtFrom && (<LoginQLDTComponent showAccessQlDtFrom={showAccessQlDtFrom} handleCloseQlDtFrom={handleCloseQlDtFrom} />)
            }
            <Container>
                <Row >
                    <Col style={{}}>
                        <div className="upper-container" >
                            <div style={{
                                position: 'sticky', top: 0, backgroundColor: config.app.styles.backgroundColor,
                                color: config.app.styles.titleColor, zIndex: 1
                            }}>
                                <Row className="justify-content-center align-items-center fade-in fade-in-1">
                                    <Col xs={6}><h5 style={{
                                        paddingTop: 10,
                                    }}>Danh Sách Môn Học Chuẩn Bị Cho Đăng Ký</h5></Col>
                                    <Col xs={3}>
                                        <Button onClick={() => { setShowRecordForm(true) }} variant="primary">
                                            Thêm Môn Đăng Ký
                                        </Button>
                                    </Col>
                                    <Col xs={3}><Button disabled={isAccessQlDt} onClick={() => { setShowAccessQlDtFrom(true) }} variant="primary">
                                        Kết Nối QLDT
                                    </Button></Col>
                                </Row>
                            </div>
                            <hr></hr>
                            <Table striped bordered hover className="fade-in fade-in-2">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th style={{ width: '50px', ...styleTH }}>#</th>
                                        <th style={{ width: '150px', ...styleTH }}>Mã MH</th>
                                        <th style={{ width: '650px', ...styleTH }}>Tên môn học</th>
                                        <th style={{ width: '117px', ...styleTH }}>Nhóm</th>
                                        <th style={{ width: '117px', ...styleTH }}>Tổ</th>
                                        <th style={{ width: '117px', ...styleTH }}>STC</th>
                                        <th style={{ width: '117px', ...styleTH }}>Action</th>
                                        <th className="d-flex justify-content-center" style={{ ...styleTH }}>Submit</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>

                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <br></br>
                <Row >
                    <Col style={{}}>
                        <div className="lower-container">
                            <div style={{
                                position: 'sticky', top: 0,
                                backgroundColor: config.app.styles.backgroundColor,
                                zIndex: 1,
                                color: config.app.styles.titleColor
                            }} className="fade-in fade-in-1">
                                <h5>Danh Sách Môn Học Đã Đăng Ký</h5>
                            </div>

                            <Table striped bordered hover className="fade-in fade-in-2">
                                <thead>
                                    <tr style={{ textAlign: 'center' }}>
                                        <th style={{ width: '50px', ...styleTH }}>#</th>
                                        <th style={{ width: '100px', ...styleTH }}>Mã MH</th>
                                        <th style={{ width: '500px', ...styleTH }}>Tên môn học</th>
                                        <th style={{ width: '80px', ...styleTH }}>Nhóm</th>
                                        <th style={{ width: '80px', ...styleTH }}>Tổ</th>
                                        <th style={{ width: '80px', ...styleTH }}>STC</th>
                                        <th style={{ ...styleTH }}>Lớp</th>
                                        <th style={{ ...styleTH }}>Ngày đăng ký</th>
                                        <th className="d-flex justify-content-center" style={{ ...styleTH }}>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody style={{ textAlign: 'center' }}>

                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>

    )
}
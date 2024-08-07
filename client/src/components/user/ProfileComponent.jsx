import DepositHistory from './DepositHistory';
import config from '../../config';
import { useEffect, useRef } from 'react'
import { Col, Row } from 'react-bootstrap';
import OrderServiceHistory from './OrderServiceHistory';
import '../../assets/css/fadeIn.css'

const styleBox = {
    border: '1px solid #ccc',
    padding: '15px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    backgroundColor: config.app.styles.sideBarColor,
    transition: 'background-color 0.6s ease, color 0.5s ease',
    color: '#adb5bd',
    width: 250,
    height: 250,
    flexDirection: 'column',
}
export default function ProfileComponent({ props }) {

    const navRef = useRef(null);

    useEffect(() => {
        if (navRef.current) {
            // Thêm lớp CSS sau khi trang đã tải xong
            navRef.current.classList.add('fade-in');
        }
    }, []);

    return (
        <div className='container'>
            <Row >
                <Col xs={12} sm={12} md={12} xl={4} lg={4} >
                    <h3 className="fade-in fade-in-1" style={{
                        color: config.app.styles.titleColor
                    }}>Thông tin cơ bản</h3>
                    <div className="fade-in fade-in-2" style={{ ...styleBox, margin: 15 }}>
                        <p>UserName: <span style={{ color: '#8B008B' }}><b>{props.username}</b></span></p>
                        <p>Email: <span style={{ color: '#8B008B' }}><b>{props.email}</b></span></p>
                        <p>Status: <span style={{ color: 'green' }}>Online</span></p>
                        <p>Account Balance: <span style={{ color: 'green' }}>100.000đ</span></p>
                    </div>

                </Col>
                <Col xs={12} sm={12} md={12} xl={8} lg={8}>
                    <h3 className="fade-in fade-in-1" style={{ marginBottom: 15, color: config.app.styles.titleColor }}>Lịch sử nạp tiền</h3>
                    <DepositHistory />
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <h3 className="fade-in fade-in-1" style={{
                    color: config.app.styles.titleColor
                }}>Lịch Sử Đặt Dịch Vụ</h3>
                <OrderServiceHistory />
            </Row>
        </div>
    )
}
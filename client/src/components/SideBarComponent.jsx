/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import '../assets/css/transferColor.css'
import LoginModelComponent from './LoginModelComponent';
import RegisterModelComponent from './RegisterModelComponent';
import { sidebarStyles } from './activate/styleComponents'
import axiosClient from '../axiosClient';
import SpinnerComponent from './activate/SpinnerComponent';
import LogoutComponent from './LogoutComponent';
import AlertModelComponent from './activate/AlertModelComponent';
import { setHook } from '../redux/HookPage';
import { useDispatch } from 'react-redux';

export default function SideBarComponent() {
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    const [showAuth, setShowAuth] = useState(sessionStorage.getItem('access_token') === undefined);
    const [logout, setLogout] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [messageAlert, setMessageAlert] = useState('')

    const handleCloseShowAlert = () => {
        setShowAlert(false)
    }
    useEffect(() => {
        setSpinner(true);
        if (sessionStorage.getItem('access_token') !== null) {
            axiosClient.get('/protected').then((response) => {
                try {
                    if (response.data.logged_in_as.username !== JSON.parse(sessionStorage.getItem('info')).username) {
                        sessionStorage.clear()
                        setShowAuth(true)
                    } else {
                        setUserInfo(response.data.logged_in_as)
                        setShowAuth(false);
                    }
                } catch (e) {
                    console.error('Wrong Format')
                    setShowAuth(true)
                    sessionStorage.clear()
                }
            }).catch((e) => {
                console.error('Invalid Token')
                sessionStorage.clear()
                setShowAuth(true)
            });


        } else {
            sessionStorage.clear()
            setShowAuth(true)
        }
        setSpinner(false);
    }, [])

    const [hovered, setHovered] = useState(null);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleMouseEnter = (index) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const links = [
        { href: '#', label: 'Số Dư: 0 vnđ' },
        { href: '/', label: 'Home Page' },
        { href: '/#Profile', label: 'Thông Tin Cá Nhân' },
        { href: '/#nap_tien', label: 'Nạp Tiền' },
        { href: '/#lsm_dich_vu', label: 'Lịch Sử Mua Dịch Vụ' },
        { href: '/#dang_ky_tin', label: 'Đăng Ký Tín' },
        { href: '/#code_ptit', label: 'Code PTIT' },
        { href: '/#english_ed', label: 'Tiếng Anh ED' },
        { href: '/#show_subject', label: 'Xem Môn Học Theo Nghành' },
        { href: '/#lsd_subject', label: 'Trắc Nghiệm Lịch Sử Đảng' },
        ...(showAuth
            ? [
                { href: '/#login', label: 'Đăng nhập' },
                { href: '/#register', label: 'Tạo tài khoản' }
            ]
            : [{ href: '/#logout', label: 'Đăng xuất' }]
        )
    ];

    const handleActionClick = (href) => {
        switch (href) {
            case '/#Profile':
                try {
                    const info = JSON.parse(sessionStorage.getItem('info'));
                    dispatch(setHook({
                        hookName: href,
                        props: {
                            userId: info.id,
                            username: info.username,
                            email: info.email,
                            role: info.role
                        }
                    }))
                } catch (error) {
                    setMessageAlert('Thông tin đăng nhập lưu trên máy không tồn tại hoặc đã bị thay đổi, vui lòng đăng nhập lại')
                    setShowAlert(true)
                }
                console.log(href)
                break;
            case '/#nap_tien':
                dispatch(setHook({
                    hookName: href,
                    props: {}
                }))
                console.log(href)
                break;
            case '/#lsm_dich_vu':
                dispatch(setHook({
                    hookName: href,
                    props: {}
                }))
                console.log(href)
                break;
            case '/#History':
                dispatch(setHook({
                    hookName: href,
                    props: {}
                }))
                console.log(href)
                break;
            case '/#dang_ky_tin':
                dispatch(setHook({
                    hookName: href,
                    props: {
                        userInfo: userInfo
                    }
                }))
                console.log(href)
                break;
            case '/#code_ptit':
                dispatch(setHook({
                    hookName: href,
                    props: {}
                }))
                console.log(href)
                break;
            case '/#english_ed':
                dispatch(setHook({
                    hookName: href,
                    props: {}
                }))
                console.log(href)
                break;
            case '/#show_subject':
                dispatch(setHook({
                    hookName: href,
                    props: {}
                }))
                console.log(href)
                break;
            case '/#login':
                if (showAuth === true)
                    setShowLoginModal(true);
                break;
            case '/#register':
                if (showAuth === true)
                    setShowRegisterModal(true);
                break;
            case '/#logout':
                if (showAuth === false)
                    setLogout(true)
                break

        }
    }

    return (
        <div style={sidebarStyles.sidebar}>
            {spinner &&
                (<div>
                    <SpinnerComponent />
                </div>)
            }
            <Nav defaultActiveKey="/home" className="flex-column">
                {links.map((link, index) => (
                    <React.Fragment key={index}>
                        {
                            index === 1 || index === 5 || index === 10 ? (<hr style={{ marginTop: 2 }}></hr>) : ''
                        }
                        <Nav.Link
                            key={index + 1}
                            href={link.href}
                            style={{
                                ...sidebarStyles.sidebarLink,
                                ...(hovered === index && sidebarStyles.hoverSidebarLink)
                            }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleActionClick(link.href)}
                            disabled={index === 0}
                        >
                            {link.label}
                        </Nav.Link>
                    </React.Fragment>
                ))}
            </Nav>
            {showAuth && (
                <>
                    <LoginModelComponent show={showLoginModal} handleClose={handleCloseLoginModal} />
                    <RegisterModelComponent show={showRegisterModal} handleClose={handleCloseRegisterModal} />
                </>
            )}
            {
                logout && (
                    <LogoutComponent />
                )
            }
            <AlertModelComponent showAlert={showAlert} handleCloseShowAlert={handleCloseShowAlert} messageAlert={messageAlert} />

        </div>
    )
}
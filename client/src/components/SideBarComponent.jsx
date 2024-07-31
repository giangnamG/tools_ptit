/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import LoginModelComponent from './LoginModelComponent';
import RegisterModelComponent from './RegisterModelComponent';
import { sidebarStyles } from './activate/styleComponents'
import axiosClient from '../axiosClient';
import SpinnerComponent from './activate/SpinnerComponent';
import LogoutComponent from './LogoutComponent';
import { setHook } from '../redux/HookPage';
import { useDispatch } from 'react-redux';

export default function SideBarComponent() {
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    const [showAuth, setShowAuth] = useState(sessionStorage.getItem('access_token') !== null);
    const [logout, setLogout] = useState(false)


    useEffect(() => {
        setSpinner(true);
        if (sessionStorage.getItem('access_token') !== null) {
            axiosClient.get('/protected').then((response) => {
                try {
                    if (response.data.logged_in_as.username !== JSON.parse(sessionStorage.getItem('info')).username) {
                        sessionStorage.clear()
                        setShowAuth(true)
                    } else {
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
        { href: '#', label: 'Số dư: 0đ' },
        { href: '/', label: 'Home Page' },
        { href: '/#Profile', label: 'Thông tin cá nhân' },
        { href: '/#nap_tien', label: 'Nạp tiền' },
        { href: '/#lsm_dich_vu', label: 'Lịch sử mua dịch vụ' },
        { href: '/#dang_ky_tin', label: 'Đăng Ký Tín' },
        { href: '/#code_ptit', label: 'Code PTIT' },
        { href: '/#english_ed', label: 'Tiếng Anh ED' },
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
                dispatch(setHook('Profile'))
                console.log(href)
                break;
            case '/#nap_tien':
                dispatch(setHook('nap_tien'))
                console.log(href)
                break;
            case '/#lsm_dich_vu':
                dispatch(setHook('lsm_dich_vu'))
                console.log(href)
                break;
            case '/#History':
                dispatch(setHook('History'))
                console.log(href)
                break;
            case '/#dang_ky_tin':
                dispatch(setHook('dang_ky_tin'))
                console.log(href)
                break;
            case '/#code_ptit':
                dispatch(setHook('code_ptit'))
                console.log(href)
                break;
            case '/#english_ed':
                dispatch(setHook('english_ed'))
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
                    <>
                        {
                            index === 1 || index === 5 || index === 8 ? (<hr></hr>) : ''
                        }
                        <Nav.Link
                            key={index}
                            href={link.href}
                            style={{
                                ...sidebarStyles.sidebarLink,
                                ...(hovered === index && sidebarStyles.hoverSidebarLink)
                            }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleActionClick(link.href)}
                            disabled={index === 0 ? true : false}
                        >
                            {link.label}
                        </Nav.Link>
                    </>
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
        </div>
    )
}
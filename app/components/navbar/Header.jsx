"use client"
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import style from './header.module.css'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { userLoggedout, userLoggedin } from '@/app/state-management/slices/login';



export default function Header() {
    const { isLogged } = useSelector(state => state.login)
    // const { isHotelLogin } = useSelector(state => state.login)
    const dispatch = useDispatch();

    useEffect(() => {
        let verify = localStorage.getItem('token')
        if (verify) dispatch(userLoggedin())
        // else if (verify) dispatch(userHotelLoggedin())
        else if (!verify) dispatch(userLoggedout())
    }, [])


    return <>
        <Navbar expand="lg" className={`${style.headerBg}`}>
            <Container>
                <Navbar.Brand className={`text-white fs-3 me-3 fw-bold`}>
                    <Link className={`text-decoration-none text-white`} href="/">
                        لوحة التحكم
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100">
                        {isLogged && <Link className={`text-decoration-none text-white mx-3 fs-4`} href="/">الصفحة الرئيسية</Link>}
                        {isLogged && <Link className={`text-decoration-none text-white mx-3 fs-4`} href="/member">العضو العامل</Link>}
                        {isLogged && <Link className={`text-decoration-none text-white mx-3 fs-4`} href="/ref-member">العضو التابع</Link>}
                        {isLogged && <Link className={`text-decoration-none text-white mx-3 fs-4`} href="/memberships">التسجيلات</Link>}
                        {isLogged && <Link className={`text-decoration-none text-white mx-3 fs-4`} href="/accounts">الفندق</Link>}
                        {isLogged && <Link className={`text-decoration-none text-white mx-3 fs-4`} href="/date-details">التقارير</Link>}

                    </Nav>
                    <Nav id="basic-navbar-nav">
                        <NavDropdown className={`text-white fs-4 me-aut`} title={''} id="basic-nav-dropdown">
                            {/* {(!isHotelLogin && !isLogged) && <NavDropdown.Item className={`fs-5`} href="/login">تسجيل الدخول</NavDropdown.Item>} */}
                            {( !isLogged) && <NavDropdown.Item className={`fs-5`} href="/login">تسجيل الدخول</NavDropdown.Item>}
                            {isLogged && <NavDropdown.Item onClick={() => { localStorage.removeItem('token') }} className={`fs-5`} href="/">تسجيل الخروج</NavDropdown.Item>}
                            {/* {isHotelLogin && <NavDropdown.Item onClick={() => { localStorage.removeItem('token') }} className={`fs-5`} href="/">تسجيل الخروج</NavDropdown.Item>} */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}
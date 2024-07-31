/* eslint-disable default-case */
import React from 'react';
import { Col, Row } from 'react-bootstrap';

import SideBarComponent from '../components/SideBarComponent';
import MainLayoutComponent from '../components/MainLayoutComponent';

export default function HomePage() {

    return (
        <Row>
            <Col xs={12} sm={12} md={3} lg={2} xl={2} className="d-flex">
                <SideBarComponent />
            </Col>
            <Col xs={12} sm={12} md={9} lg={10} xl={10} className="content p-4">
                <MainLayoutComponent />
            </Col>
        </Row>
    )
}
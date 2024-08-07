import React from 'react';
import { Table } from 'react-bootstrap';
import '../../assets/css/orderHistoryService.css';
import config from '../../config';
import '../../assets/css/fadeIn.css'

export default function OrderServiceHistory() {
    const fields = [
        {
            name: '#',
            width: '2%',
        },
        {
            name: 'Tên dịch vụ',
            width: '10%',
        },
        {
            name: 'Số lượng yêu cầu',
            width: '10%',
        },
        {
            name: 'Đơn giá (K Vnđ)',
            width: '10%',
        },
        {
            name: 'Tổng tiền',
            width: '10%',
        },
        {
            name: 'Request Time',
            width: '10%',
        },
        {
            name: 'Finish Time',
            width: '10%',
        },
        {
            name: 'Trạng thái',
            width: '10%',
        },
    ]
    return (
        <>
            <Table striped responsive hover className="fade-in fade-in-2 table-fixed">
                <thead className="sticky-header" style={{ padding: 12 }}>
                    <tr>
                        {fields.map((field, index) => (
                            <th style={{ width: field.width, backgroundColor: config.app.styles.sideBarColor, color: '#adb5bd' }} key={index}>{field.name}</th>
                        ))}
                    </tr>
                </thead>
            </Table>

            <div className="fade-in fade-in-3 scroll-container">
                <Table striped responsive bordered hover >
                    <tbody>
                        {Array.from({ length: 20 }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                <td style={{ width: fields[0].width, backgroundColor: config.app.styles.sideBarColor, color: '#adb5bd' }}>{rowIndex + 1}</td>
                                {Array.from({ length: 7 }).map((_, cellIndex) => (
                                    <td style={{ width: fields[cellIndex + 1].width, backgroundColor: config.app.styles.sideBarColor, color: '#adb5bd' }} key={cellIndex}>Table cell {cellIndex}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}

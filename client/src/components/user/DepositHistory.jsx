import Table from 'react-bootstrap/Table';
import '../../assets/css/lichsunap.css'
import config from '../../config';
import '../../assets/css/fadeIn.css'

export default function DepositHistory() {
    const fields = [
        {
            name: '#',
            width: '10%',
        },
        {
            name: 'Ngày Nạp',
            width: '30%',
        },
        {
            name: 'Mệnh Giá',
            width: '30%',
        },
        {
            name: 'Số Dư',
            width: '30%',
        }
    ]
    return (
        <>
            <Table className="fade-in fade-in-2" striped responsive hover>
                <thead >
                    <tr >
                        {fields.map((field, index) => (
                            <th style={{ width: field.width, backgroundColor: config.app.styles.sideBarColor, color: '#adb5bd' }} key={index}>{field.name}</th>
                        ))}
                    </tr>
                </thead>
            </Table>
            <div className="fade-in fade-in-3 table-wrapper">
                <Table striped responsive bordered hover>
                    <tbody>
                        {Array.from({ length: 20 }).map((_, rowIndex) => (
                            <tr key={rowIndex} >
                                <td style={{ backgroundColor: config.app.styles.sideBarColor, color: '#adb5bd' }}>{rowIndex + 1}</td>
                                {Array.from({ length: 3 }).map((_, cellIndex) => (
                                    <td style={{ backgroundColor: config.app.styles.sideBarColor, color: '#adb5bd' }} key={cellIndex}>Table cell {cellIndex}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>

    )
}


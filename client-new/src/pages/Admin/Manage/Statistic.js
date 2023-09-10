import AdminHeader from '../AdminHeader/AdminHeader'
import './Statistic.scss'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import Navigators from '../Navigators/Navigators';
import { useEffect, useState } from 'react';
import { getAllReportService } from '../../../service/ReportSercive';

const Statistic = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        getAllReport()
    }, [])

    const getAllReport = async () => {
        let res = await getAllReportService()

        if(res && res.status === 'OK') {
            setData({
                order: res?.countOrder,
                user: res?.user,
                revennu: res?.revennu,
                inventory: res?.inventory,
            })
        }
    }

    return (
        <div className="container-statistic">
            <AdminHeader />
            <Navigators />
            <div className='content'>
                <div className='container'>
                    <h3>Thống kê</h3>
                    <div className='top'>
                        <div className='item'>
                            <div className='left'>
                                <i className="order fa-solid fa-cart-shopping"></i>
                            </div>
                            <div className='right'>
                                <span className='title'>Đơn hàng</span>
                                <span className='quanlity'>{data && data.order ? data.order : 0}</span>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='left'>
                                <i className="inventory fa-solid fa-bag-shopping"></i>
                            </div>
                            <div className='right'>
                                <span className='title'>Tồn kho</span>
                                <span className='quanlity'>{data && data.inventory ? data.inventory : 0}</span>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='left'>
                                <i className="user fa-regular fa-user"></i>
                            </div>
                            <div className='right'>
                                <span className='title'>Khách hàng</span>
                                <span className='quanlity'>{data && data.user ? data.user : 0}</span>
                            </div>
                        </div>
                        <div className='item'>
                            <div className='left'>
                                <i className="renvenue fa-solid fa-dollar-sign"></i>
                            </div>
                            <div className='right'>
                                <span className='title'>Doanh thu</span>
                                <span className='quanlity'>{data && data.revennu ? data.revennu : 0}</span>
                            </div>
                        </div>
                    </div>
                    <div className='center'>
                        <Bar
                            data={{
                                labels:['Tháng 1', 'Tháng 2', 'Tháng 3'],
                                datasets:[{
                                    label: 'Doanh thu',
                                    data: [100, 200, 300],
                                    backgroundColor: 'red',
                                    barThickness: 60
                                }],
                            }}
                            options={{
                                scales: {
                                    x: {
                                        scaleLabel: {
                                            labelString: 'Months',
                                            display: true
                                        }
                                    },
                                    y: {
                                        scaleLabel: {
                                            labelString: 'Revenue',
                                            display: true
                                        },
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }
                                }
                            }}
                        >
                        </Bar>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistic
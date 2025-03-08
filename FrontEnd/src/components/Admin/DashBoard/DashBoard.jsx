import StatCard from "./StatCard";
import {useAdminReport} from "../../../hook/index.jsx";
import {useEffect, useState} from "react";
import {Button, Datepicker, Modal} from "flowbite-react";
import {STATUS_CODES} from "../../../constant/index.jsx";
import { OrderTable, PieChart} from "../../index.jsx";
import {notifyOrderMessage} from "../../../../utils/index.jsx";
import TableSkeleton from "../../Skeleton/TableSkeleton.jsx";

function Dashboard() {
    const [amout_paid, setAmout_paid] = useState('');
    const [totalProducts, setTotalProducts] = useState('');
    const [totalOrders, setTotalOrders] = useState('');
    const [totalRevenue, setTotalRevenue] = useState('');
    const [totalProfit , setTotalProfits] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [selectedDateStart, setSelectedDateStart] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    });

    const [selectedDateEnd, setSelectedDateEnd] = useState(() => {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate());
    });
    const formatCurrency = (value) => {
        if(typeof (value) == 'string' ){
            return "Không có dữ liệu";
        }
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(value);
    };
    const formatNumber = (value) => {
        if(typeof (value) == 'string' ){
            return "Không có dữ liệu";
        }
        return value;
    };

    const handleDate = () => {
        setOpenModal(false);
        setOpenDateModal(true);
    }
    const {
        loading,
        error,
        data,
        getReportToday,
        getReportLast7Days,
        getReportThisMonth,
        getReportYesterday,
        getReportDateRange
    } = useAdminReport();
    const [orders , setOrders] = useState([]);
    const [totalPage , setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;
    const totalPages = Math.ceil(totalPage / ordersPerPage);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await getReportToday(currentPage, ordersPerPage);
            setOrders(data);
            setTotalPage(data.totalPage)
        }
        fetchData();
    }, [getReportToday , currentPage]);
    useEffect(() => {
        if (data?.statusCode === STATUS_CODES.OK.code) {
            setOrders(data.data);
            setTotalOrders(data.data.totalOrders || '');
            setTotalProducts(data.data.totalProducts || '');
            setAmout_paid(data.data.amount_paid || '');
            setTotalRevenue(data.data.totalRevenue || '')
            setTotalProfits(data.data.totalProfit || '')
            setTotalPage(data.data.totalPage)
        }
        if(data?.statusCode === STATUS_CODES.NOT_FOUND.code){
            notifyOrderMessage("Không tìm thấy dữ liệu về lựa chọn")
            setOrders('Không có dữ liệu')
            setTotalOrders('Không có dữ liệu');
            setTotalProducts('Không có dữ liệu');
            setAmout_paid( 'Không có dữ liệu');
            setTotalRevenue( 'Không có dữ liệu')
            setTotalProfits('Không có dữ liệu')
            setTotalPage('không có dữ liệu')
        }
    }, [data]);

    const handleDateStart = (date) => {
        setSelectedDateStart(date);
    };
    const handleDateEnd = (date) => {
        setSelectedDateEnd(date);
    }
    const handleSelectedDateRange = async () => {
        setOpenModal(false);
        setOpenDateModal(false);
        const formattedDateStart = selectedDateStart.toISOString().split("T")[0];
        const formattedDateEnd = selectedDateEnd.toISOString().split("T")[0];
        await getReportDateRange(formattedDateStart, formattedDateEnd ,currentPage , ordersPerPage);

    }

    if (loading) {
        return <div>
            <TableSkeleton/>
        </div>;
    }
    if (error) {
        return <div>Lỗi về trang báo cáo</div>;
    }
    return (
        <>
            <section className="flex flex-col gap-2 p-2">
                <div className="flex justify-between px-2">
                    <h1 className="self-start text-3xl font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                        Báo cáo thống kê
                    </h1>
                    {/* Bộ lọc */}
                    <div className="flex">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="flex  border items-center border-gray-20 rounded-2xl p-2 py-4 my-2 justify-center hover:border-gray-300 hover:shadow-2xl hover:shadow-gray-400 hover:bg-gray-100  ">
                            <h2>Lọc theo</h2>
                            <img className="object-cover h-10 w-10" src="/Admin/Dashboard/filter.png" alt="Filter"/>
                        </button>
                        <Modal show={openModal} onClose={() => setOpenModal(false)}>
                            <Modal.Body>
                                <div className="max-h-screen">
                                    <div className="border border-gray-300 rounded-2xl ">
                                        <ul>
                                            <li className="p-2 border-b-2 border-gray-300 flex justify-center">
                                                <button
                                                    className="px-4 py-2 text-black text-md rounded hover:text-blue-600 hover:scale-125"
                                                    onClick={() => {
                                                        getReportToday(currentPage,ordersPerPage);
                                                        setOpenModal(false);
                                                    }}
                                                >
                                                    Hôm nay
                                                </button>
                                            </li>

                                            <li className="p-2 border-b-2 border-gray-300 flex justify-center">
                                                <button
                                                    className="px-4 py-2 text-black text-md rounded hover:text-blue-600 hover:scale-125"
                                                    onClick={() => {
                                                        getReportYesterday(currentPage , ordersPerPage);
                                                        setOpenModal(false);
                                                    }}
                                                >
                                                    Hôm qua
                                                </button>
                                            </li>

                                            <li className="p-2 border-b-2 border-gray-300 flex justify-center">
                                                <button
                                                    className="px-4 py-2 text-black text-md rounded hover:text-blue-600 hover:scale-125"
                                                    onClick={() => {
                                                        getReportLast7Days(currentPage , ordersPerPage);
                                                        setOpenModal(false);
                                                    }}
                                                >
                                                    7 ngày gần đây
                                                </button>
                                            </li>
                                            <li className="p-2 border-b-2 border-gray-300 flex justify-center">
                                                <button
                                                    className="px-4 py-2 text-black text-md rounded hover:text-blue-600 hover:scale-125"
                                                    onClick={() => {
                                                        getReportThisMonth(currentPage,ordersPerPage);
                                                        setOpenModal(false);
                                                    }}
                                                >
                                                    Tháng này
                                                </button>
                                            </li>
                                            <li className="p-2 flex justify-center">
                                                <button
                                                    className="peer/draft px-4 py-2 text-black text-md rounded hover:text-blue-600 hover:scale-125"
                                                    onClick={handleDate}
                                                >
                                                    Chọn khoảng thời gian
                                                </button>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color="gray" onClick={() => setOpenModal(false)}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Modal */}
                        {openDateModal && (
                            <div
                                className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-start p-8  z-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                                    <div className="flex flex-col gap-2">
                                        {/* Form content */}
                                        <div className="flex gap-2">
                                            <label>
                                                <strong>Bắt </strong>đầu
                                            </label>
                                            <Datepicker defaultValue={selectedDateEnd} onChange={handleDateStart} id="start-date" language="vn" labelTodayButton="Ngày bắt đầu" />
                                            <label>
                                                <strong>Kết </strong>thúc
                                            </label>
                                            <Datepicker defaultValue={selectedDateEnd} onChange={handleDateEnd} id="end-date" language="vn" labelTodayButton="Ngày kết thúc" />
                                        </div>

                                        <div className="flex p-2 justify-center gap-4">
                                            <button
                                                className="px-4 py-2 text-black rounded border border-gray-300 hover:bg-gray-100"
                                                onClick={() => {setOpenDateModal(false);}}
                                            >
                                                Tắt
                                            </button>
                                            <button
                                                className="px-4 py-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 rounded hover:bg-blue-400"
                                                onClick={handleSelectedDateRange}
                                            >
                                                Lọc
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <div className="grid grid-cols-3 gap-16 p-2">
                    <div className="flex flex-col ">
                        <StatCard
                            title="Tổng số tiền nhận"
                            value={formatCurrency(amout_paid)}
                            icon="/Admin/Dashboard/financial-profit.png"
                        />
                    </div>
                    <div className="flex flex-col">
                        <StatCard
                            title="Số lượng đơn hàng"
                            value={formatNumber(totalOrders)}
                            icon="/Admin/Dashboard/received.png"
                        />
                    </div>
                    <div>
                        <StatCard
                            title="Tổng sản phẩm đã bán ra"
                            value={formatNumber(totalProducts)}
                            icon="/Admin/Dashboard/bundling.png"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 h-full items-center  gap-8 p-4">
                    <div className="p-4 border border-gray-300 rounded-lg shadow-xl text-transform: uppercase self-start text-2xl break-normal hover:bg-gray-50 hover:scale-105 hover:shadow-2xl hover:shadow-gray-400">
                        <h2 className="flex  justify-center">Doanh thu và lợi nhuận</h2>
                        <PieChart
                        profit={totalProfit}
                        revenue={totalRevenue}
                        />
                    </div>
                    <div className="col-span-2">
                        <div className="flex h-full  ">
                            <OrderTable
                                Orders={orders}
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                type="admin"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex">

                </div>
            </section>
        </>
    );
}

export default Dashboard;

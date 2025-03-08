import PropTypes from 'prop-types';
import PaginationComponent from "../../Pagination/PaginationComponent.jsx";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../Modal/DeleteModal.jsx'
import { useEmployeeHook } from '../../../hook';
import {notifyDeleteEmployee, notifyEmployeeMessage, notifySendEmailEmployee} from "../../../../utils/index.jsx";
import {STATUS_CODES} from "../../../constant/index.jsx";
import {LoadingSkeleton} from "../../index.jsx";
const EmployeeTable = ({ employees, currentPage, totalPages, onPageChange ,fetchEmployee , employeesPerPage , searchTerm }) => {
    const { loadingEmployee ,errorEmployee , LockedEmployeeById , UnLockEmployeeById, deleteEmployeeById ,ResetPasswordEmployeeById} = useEmployeeHook();
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();
    const openDeleteModal = (employee) => {
        setSelectedEmployee(employee);
        setModalOpen(true);
    };
    const handleLock = async (userId) => {
        try {
            const response = await LockedEmployeeById(userId);
            if (response.statusCode === STATUS_CODES.OK.code) {
                notifyEmployeeMessage(response.message);
                fetchEmployee(currentPage, employeesPerPage, searchTerm);
            }
        } catch (error) {
            console.error('Lỗi khi khóa tài khoản:', error);
        }
    };

    const handleUnlock = async (userId) => {
        try {
            const response = await UnLockEmployeeById(userId);
            if (response.statusCode === STATUS_CODES.OK.code) {
                notifyEmployeeMessage(response.message);
                fetchEmployee(currentPage, employeesPerPage, searchTerm);
            }
        } catch (error) {
            console.error('Lỗi khi mở khóa tài khoản:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteEmployeeById(selectedEmployee.user_id);
            setModalOpen(false);
            fetchEmployee(currentPage,employeesPerPage, searchTerm);
            notifyDeleteEmployee();
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error);
        }
    };
    const openAddEmployee = () => {
        navigate('/admin/employee/addEmployee');
    };
    const handleViewEmployee = (employeeId) =>{
        navigate(`/admin/employee/viewEmployee/${employeeId}`);
    }
    const handleResetEmail = async (employeeId) =>{
        try {
            let respone = await ResetPasswordEmployeeById(employeeId);
            if(respone && respone.statusCode === STATUS_CODES.OK.code){
                notifySendEmailEmployee();
            }
            else if(respone && respone.statusCode === STATUS_CODES.BAD_REQUEST.code){
                notifyEmployeeMessage(respone.message)
            }

        }catch (e){
            notifyEmployeeMessage(e);
        }
    }
    if (loadingEmployee) return <div><LoadingSkeleton/></div>;
    if (errorEmployee) return <div>Error: {errorEmployee}</div>;
    return (
        <div className="container w-full h-full p-6">

            <button
                onClick={openAddEmployee}
                className="flex items-center h-14 gap-2 p-6 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                <img src="/icon/add-100.png" className="w-12 h-12" alt="thêm tài khoản nhân viên"/>
                Thêm tài khoản nhân viên
            </button>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="py-3 px-5 text-left">Tên nhân viên</th>
                        <th className="py-3 px-5 text-left">Ảnh đại diện</th>
                        <th className="py-3 px-5 text-left">Ngày sinh</th>
                        <th className="py-3 px-5 text-left">Email</th>
                        <th className="py-3 px-5 text-left">Username</th>
                        <th className="py-3 px-5 text-left">Trạng thái</th>
                        <th className="py-3 px-5 text-left">Reset mật khẩu</th>
                        <th className="py-3 px-5 text-center">Hành động</th>

                    </tr>
                    </thead>
                    <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={index} className="hover:bg-gray-50 border-b">
                                <td className="py-3 px-5">{employee.fullName}</td>
                                <td className="py-3 px-5">
                                    {/* Khung ảnh nhỏ */}
                                    <img
                                        src={employee.background ? `${import.meta.env.VITE_BASE_URL}/images/${employee.background}` : '/bg.png'}
                                        alt="Avatar"
                                        className="w-20 h-25 object-cover rounded-full border border-gray-300"
                                    />
                                </td>
                                <td className="py-3 px-5">
                                    {new Intl.DateTimeFormat('vi-VN', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    }).format(new Date(employee.dateOfBirth))}
                                </td>

                                <td className="py-3 px-5">{employee.email}</td>
                                <td className="py-3 px-5">{employee.username}</td>
                                {/* Nút khóa hoặc mở khóa*/}
                                <td className="py-3 px-5">
                                    {/* Nút khóa hoặc mở khóa*/}
                                    {employee.isHasLocked ? (
                                        <button
                                            className="w-full text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-3xl "
                                            onClick={() => handleUnlock(employee.user_id)}
                                            onMouseEnter={(e) => {
                                                e.target.textContent = "Mở Khóa";
                                                e.target.className = "w-full text-white bg-green-500 px-2 py-1 rounded-3xl";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.textContent = "Đang Khóa";
                                                e.target.className = "w-full text-white bg-red-500 hover:bg-red-600 px-2 py-1  rounded-3xl";
                                            }}
                                        >
                                            Đang khóa
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded-3xl"
                                            onClick={() => handleLock(employee.user_id)}
                                            onMouseEnter={(e) => {
                                                e.target.textContent = "Khóa";
                                                e.target.className = "w-full text-white bg-red-500 rounded-3xl px-2 py-1";
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.textContent = "Không Khóa";
                                                    e.target.className = "w-full text-white bg-green-500 hover:bg-green-600 rounded-3xl px-2 py-1";
                                            }}
                                        >
                                            Không khóa
                                        </button>
                                    )}
                                </td>
                                <td className="p-6 gap 2">
                                    <button
                                        className="flex w-16 h-16 justify-center items-center gap-2 text-black-500 bg-white hover:text-white hover:bg-yellow-300 shadow-lg shadow-green-300 rounded-xl border border-gray-200"
                                        onClick={() => handleResetEmail(employee.user_id)}
                                    >
                                        <img src="/icon/email-50.png"/>
                                    </button>

                                </td>
                                <td className="flex p-6 gap 2 ">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="w-16 h-16 flex justify-center items-center text-white hover:bg-yellow-300 border border-gray-200 shadow-lg shadow-yellow-600 rounded-md group relative"
                                            onClick={() => handleViewEmployee(employee.user_id)}
                                        >
                                            <img alt="Detail Icon" src="/icon/detail-100.png"
                                                 className="w-full h-full"
                                            />
                                            <div
                                                className="absolute z-10 p-4 inset-y-0 right-14 hidden items-center group-hover:flex">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                                    Xem chi tiết
                                                </div>
                                            </div>
                                        </button>
                                        <button
                                            className="w-16 h-16 flex justify-center items-center text-black bg-white hover:bg-red-600 border border-gray-200 shadow-lg shadow-red-500 rounded-md group relative"
                                            onClick={() => openDeleteModal(employee)}
                                        >
                                            <img
                                                alt="Delete Icon"
                                                src="/icon/delete-100.png"
                                                className="w-full h-full"
                                            />

                                            <div
                                                className="absolute inset-y-0 left-12 hidden items-center group-hover:flex group-hover:translate-x-[-20%]">
                                                <div
                                                    className="relative whitespace-nowrap rounded-md bg-white text-sm font-semibold text-gray-900 drop-shadow-lg">
                                                    <div className="absolute inset-0 -left-1 flex items-center">
                                                        <div className="h-2 w-2 rotate-45 bg-white"></div>
                                                    </div>
                                                    Xóa
                                                </div>
                                            </div>
                                        </button>


                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-3 px-5">Không có nhân viên</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
                title="Xóa nhân viên"
                description={`Bạn có muốn xóa tài khoản ${selectedEmployee?.username}?`}
            />
            <div className="flex justify-center mt-4">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>

        </div>
    );
};

EmployeeTable.propTypes = {
    employees: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    fetchEmployee: PropTypes.func.isRequired,
    employeesPerPage: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
};

export default EmployeeTable;

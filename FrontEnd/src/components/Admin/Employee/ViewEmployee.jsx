import {UserCircleIcon} from '@heroicons/react/24/solid'
import {useEmployeeHook} from "../../../hook/index.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
function ViewEmployee() {
    const navigate = useNavigate();
    const {id} = useParams();
    const { loadingEmployee , errorEmployee , getEmployeeById , employee } = useEmployeeHook();
    const [fullName, setFullName] = useState('');
    const [dateOfBirth , setDateOfBirth] = useState(new Date("2024-10-30 00:00:00"));
    const [email, setEmail] = useState('');
    const [ isHasPassword , setIsHasPassword ] = useState(false);
    const [userName , setUserName] = useState('');
    const [isHasLocked , setIsHasLocked] = useState(false);
    const [background , setBackground] = useState(false);
    const [descriptionRole , setDescriptionRole] = useState('');
    useEffect(() => {
        const fetchEmployeeById = async () => {
            if (id) {
                await getEmployeeById(id);
            }
        };

        fetchEmployeeById();
    }, [id, getEmployeeById]);

    useEffect(() => {
        if (employee) {
            setFullName(employee.fullName);
            setDateOfBirth(new Date(employee.dateOfBirth));
            setEmail(employee.email);
            setBackground(employee.background);
            setUserName(employee.username);
            setIsHasLocked(employee.isHasLocked);
            setIsHasPassword(employee.isHasPassword)
            setDescriptionRole(employee.role.role_description);
        }
    }, [employee]);
    if (loadingEmployee) {
        return <div>Đang tải nhân viên ..</div>;
    }

    if (errorEmployee) {
        return <div>Lỗi: {errorEmployee}</div>;
    }
    if (!employee) {
        return <div>Không tìm thấy thông tin nhân viên.</div>;
    }
    return (
        <>
            <div className="container mx-auto px-4 ">
                <div className="flex items-center px-12 py-12 sm:px-12  sm:py-12  rounded-md">
                    <nav aria-label="Breadcrumb" className="flex space-x-2">
                        <a href="/admin" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            Trang chủ
                        </a>
                        <span className="text-gray-400">/</span>
                        <a href="/admin/employee" className="text-gray-500 hover:text-indigo-600 text-sm font-medium">
                            tài khoản
                        </a>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 text-sm font-semibold">{`Tài khoản nhân viên ${fullName}`}</span>
                    </nav>
                </div>

                <h1 className="self-start text-3xl text-center font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                    Chi tiết tài khoản nhân viên
                </h1>
                <div className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12 bg-white shadow-lg rounded-lg ">

                    <div className="flex space-x-6 w-full p-2">
                        {/* Left Column: Information */}
                        <div className="space-y-6 w-2/3">
                            <div className="flex flex-col space-y-4">
                                {/* Tên nhân viên */}
                                <div className="flex items-center">
                                    <img src="/icon/name-50.png" className="p-2"></img>
                                    <p className="font-medium text-gray-700 mr-2">Họ và tên nhân viên:</p>
                                    <strong>{fullName}</strong>
                                </div>
                                {/* Ngày sinh nhân viên */}
                                <div className="flex items-center">
                                    <img src="/icon/date-50.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Ngày sinh:</p>
                                    <strong>{dateOfBirth.toLocaleDateString()}</strong>
                                </div>
                                {/* Email nhân viên */}
                                <div className="flex items-center">
                                    <img src="/icon/email-50.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Email:</p>
                                    <strong>{email}</strong>
                                </div>
                                {/* Vị trí nhân viên */}
                                <div className="flex items-center">
                                    <img src="/icon/shop-50.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Vị trí:</p>
                                    <strong>{descriptionRole}</strong>

                                </div>
                                {/* Username nhân viên */}
                                <div className="flex items-center">
                                    <img src="/icon/username-50.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Username:</p>
                                    <strong>{userName}</strong>
                                </div>

                                {/* Trạng thái tài khoản nhân viên */}
                                <div className="flex items-center">
                                    <img src="/icon/locked-50.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Trạng thái tài khoản:</p>
                                    <strong>{isHasPassword}</strong>
                                    {isHasLocked ? (

                                        <button type="button"
                                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Khóa
                                        </button>
                                    ) : (
                                        <button type="button"
                                                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Không
                                            khóa

                                        </button>
                                    )};
                                </div>

                                {/* Trạng thái mật khẩu nhân viên */}
                                <div className="flex items-center">
                                    <img src="/icon/password-50.png" className="p-2"/>
                                    <p className="font-medium text-gray-700 mr-2">Trạng thái mật khẩu:</p>
                                    {isHasPassword ? (
                                        <button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                        >
                                            Đã có
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                        >
                                            Chưa có
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Profile Picture */}
                        <div className="flex flex-col items-center justify-center w-1/2 space-y-4">


                            <p className="font-medium text-gray-700">Ảnh đại diện:</p>
                            <div className="w-50 h-50">
                                {background ? (
                                    <img
                                        src={`${import.meta.env.VITE_BASE_URL}/images/${background}`}
                                        alt="Thumbnail"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <UserCircleIcon className="w-30 h-30 text-gray-300"/>
                                        <div className="text-gray-500 mt-2">Chưa có ảnh</div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="mt-20 border border-gray-100"></div>
                    <div className="mt-6 pt-2 flex items-center justify-center gap-x-6">

                        <button
                            onClick={() => navigate("/admin/employee/")}
                            className="rounded-md bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl hover:shadow-2xl hover:scale-125 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline "
                        >
                            Quay về trang chủ
                        </button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ViewEmployee;
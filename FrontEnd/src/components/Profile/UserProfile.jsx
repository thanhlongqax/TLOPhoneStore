import {UserCircleIcon} from '@heroicons/react/24/solid'
import {useEmployeeHook} from "../../hook/index.jsx";
import {useEffect, useState} from "react";
import {imageService} from "../../service"
import { notifyEmployeeMessage} from "../../../utils";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {LoadingSkeleton} from "../index.jsx";
import {Datepicker} from "flowbite-react";
function UserProfile() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [background , setBackground] = useState('');
    const [selectedBackground, setSelectedBackground] = useState(null);
    const [fullName , setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [userId , setUserId] = useState(Number);
    const [dateOfBirth , setDateOfBirth] = useState(new Date("2024-11-30"));
    console.log(dateOfBirth);
    const accessToken = localStorage.getItem('accessToken');
    const decoded = jwtDecode(accessToken);
    const {loadingEmployee , errorEmployee , getEmployeeByUserName , updateEmployeeById} = useEmployeeHook()
    const handleDateChange = (date) => {
        setDateOfBirth(date);
    };
    const fetchData = async (username) => {
        const employee = await getEmployeeByUserName(username);
        setUserId(employee.user_id)
        setEmail(employee.email);
        setBackground(`${import.meta.env.VITE_BASE_URL}/images/${employee.background}`);
        setFullName(employee.fullName);
        setDateOfBirth(employee.dateOfBirth);
    }
    useEffect(() => {
        fetchData(decoded.username)
    },[accessToken])

    const handleBackgroundChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader(); // Tạo FileReader
            reader.onload = () => {
                setBackground(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedBackground(file)
        }
    };
    const uploadImages = async () => {
        let backgroundUrl = "";
        try {
            if (selectedBackground) {
                let folderName = selectedBackground.name.toLowerCase();
                folderName = "background";
                const thumbnailResponse = await imageService.uploadImage(folderName, selectedBackground);
                backgroundUrl = thumbnailResponse.url;
            }
        }catch (error){
            notifyEmployeeMessage("Lỗi khi upload ảnh lên server" , error)
        }
        return {backgroundUrl};
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            notifyEmployeeMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }
        const {backgroundUrl} = await uploadImages();
        if (!newPassword && !backgroundUrl && !fullName && !dateOfBirth && !email) {
            notifyEmployeeMessage("Vui lòng nhập các thông tin hoặc 1 thông tin mới để cập nhật !");
            return;
        }
        const data = {
            fullName : fullName || null,
            email : email || null,
            dateOfBirth : dateOfBirth || null,
            password: newPassword || null,
            background: backgroundUrl || null,

        }
        try {
            await updateEmployeeById(userId,data)
            notifyEmployeeMessage("Cập nhật thành công")
            navigate("/");
        } catch (error) {
            console.log("Lỗi khi tạo nhân viên:", error);
            notifyEmployeeMessage(`Lỗi khi tạo nhân viên ${error}`);
        }

    };

    if (loadingEmployee) {
        return <div><LoadingSkeleton/></div>;
    }
    if(errorEmployee){
        return <div>Không có dữ liệu về nhân viên này</div>
    }
    return (
        <>
            <div className="container mx-auto px-4 ">
                <h1 className="items-center justify-center text-center self-start text-4xl font-bold tracking-normal text-neutral-800 transform uppercase">
                    Tài khoản
                </h1>

                {loadingEmployee ? (
                    <LoadingSkeleton/>
                ) : (
                    <form
                        className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12  border border-blue-50 bg-white shadow-lg rounded-lg "
                        onSubmit={handleSubmit}>
                        <div className="flex space-x-4 w-full p-2  ">
                            <div className="space-y-4 w-1/2">
                                <div className="space-y">
                                    <div className="pb-12">
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                            <div className="sm:col-span-4">
                                                <label htmlFor="newpassword"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    Mật khẩu mới
                                                </label>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                        <input
                                                            id="newpassword"
                                                            name="newpassword"
                                                            type="password"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            placeholder="Nhập mật khẩu mới ở đây"
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="sm:col-span-4">
                                                <label htmlFor="confirmpassword"
                                                       className="block text-sm/6 font-medium text-gray-900">
                                                    Xác nhận mật khẩu mới
                                                </label>
                                                <div className="mt-2">
                                                    <div
                                                        className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                        <input
                                                            id="confirmpassword"
                                                            name="confirmpassword"
                                                            type="password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            placeholder="Nhập mật khẩu mới xác nhận ở đây"
                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="mt-10 w-1/2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="newpassword"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Họ và tên
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input
                                                id="fullName"
                                                name="fullName"
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Nhập mật khẩu mới ở đây"
                                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="newpassword"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Ngày sinh
                                    </label>
                                    <div className="mt-2">
                                        <div
                                            className="flex p-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <Datepicker id="date" language="vn"
                                                        labelTodayButton="Ngày hôm nay"
                                                        onChange={handleDateChange} />
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="p-6 h-full w-full">
                            <div className="flex justify-center">
                                <div className="grid grid-col ">
                                    <label htmlFor="photo"
                                           className="block text-sm/6  font-medium text-gray-900">
                                        Ảnh đại diện nhân viên
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        {background ? (
                                            <img
                                                src={background}
                                                alt="Thumbnail"
                                                className="w-30 h-20 rounded-full object-cover"
                                            />
                                        ) : (
                                            <UserCircleIcon aria-hidden="true"
                                                            className="w-20 h-25 text-gray-300"
                                                            textAnchor="Chưa có ảnh"/>
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleBackgroundChange}
                                            multiple
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-x-6 border-t p-4 border-gray-900/10">
                            <button type="button"
                                    onClick={() => {
                                        navigate("/")
                                    }}
                                    className="text-sm/6 font-semibold text-gray-900">
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={loadingEmployee}
                                className=" rounded-md bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gradient-to-br focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Thay đổi
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>

    )
}

export default UserProfile;
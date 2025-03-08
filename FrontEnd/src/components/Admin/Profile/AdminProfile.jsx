import {UserCircleIcon} from '@heroicons/react/24/solid'
import {useAdmin} from "../../../hook/index.jsx";
import { useState} from "react";
import {imageService} from "../../../service"
import { notifyEmployeeMessage} from "../../../../utils";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {LoadingSkeleton} from "../../index.jsx";
function AdminProfile() {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [background , setBackground] = useState(false);
    const [selectedBackground, setSelectedBackground] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    const {loading , error , updateAdmin}  = useAdmin();
    const handleBackgroundChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setBackground(reader.result);
        };
        reader.readAsDataURL(file);
        setSelectedBackground(file)

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
        }catch (e){
            console.log("Chưa có ảnh upload" , e);
        }
        return {backgroundUrl};
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            notifyEmployeeMessage("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }
        const decoded = jwtDecode(accessToken);
        const {backgroundUrl} = await uploadImages();
        if (!newPassword && !backgroundUrl) {
            notifyEmployeeMessage("Vui lòng nhập mật khẩu mới và chọn ảnh nền !");
            return;
        }
        const data = {
            password: newPassword || null,
            background: backgroundUrl || null,
        }
        try {
            await updateAdmin(decoded.username,data)
            notifyEmployeeMessage("Cập nhật thành công")
            navigate("/admin");
        } catch (error) {
            console.log("Lỗi khi tạo nhân viên:", error);
            notifyEmployeeMessage(`Lỗi khi tạo nhân viên ${error}`);
        }

    };

    if (error) {
        return <div>Lỗi: {error}</div>;
    }

    return (
        <>
            <div className="container mx-auto px-4 ">
                <h1 className="items-center justify-center text-center self-start text-4xl font-bold tracking-normal text-neutral-800 transform uppercase">
                    Tài khoản
                </h1>

                {loading ? (
                    <LoadingSkeleton/>
                ) : (
                    <form
                        className="px-12 py-12 pb-12 mb-12 mt-8 sm:px-12  border border-blue-50 bg-white shadow-lg rounded-lg "
                        onSubmit={handleSubmit}>
                        <div className="flex space-x-4 w-full p-2 border-b border-gray-900/10 ">
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
                            <div className="pl-4 space-y-4 w-1/2 ml-4">
                                <div className="col-span-full">
                                    <label htmlFor="photo"
                                           className="block text-sm/6 font-medium text-gray-900">
                                        Ảnh đại diện admin
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        {background ? (
                                            <img
                                                src={background}
                                                alt="Thumbnail"
                                                className="w-20 h-25 rounded-full object-cover"
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

                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <button type="button"
                                    onClick={() => {
                                        navigate("/admin/")
                                    }}
                                    className="text-sm/6 font-semibold text-gray-900">
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
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

export default AdminProfile;
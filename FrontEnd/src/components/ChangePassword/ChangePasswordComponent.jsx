import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {notifyLogin , notifyError} from "../../../utils";
import { useAuthHook } from "../../hook/index.jsx";
import {AuthSkeleton, LoadingSkeleton} from "../index.jsx";
function ChangePasswordComponent() {
    const [credentials, setCredentials] = useState({ newPassword: '', confirmPassword: '' });
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState(null);
    const [loadingRegister, setLoadingRegister] = useState(true);
    const auth = useAuthHook();
    const { loading, error, changePassword } = auth;
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenParam = queryParams.get('token');
        setToken(tokenParam);
    }, [location.search]);

    useEffect(() => {
        const timer = setTimeout(() => setLoadingRegister(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await changePassword(credentials , token);
            if (response.statusCode === 200 || response.statusCode === 201) {
                notifyLogin();
                navigate('/login');
            } else {
                const errorMessage = response?.message || 'Đăng nhập thất bại!';
                notifyError(errorMessage);
            }
        } catch (err) {
            console.error("Login failed:", err);
            notifyError(err);
        }
    };
    if (loading) {
        return <LoadingSkeleton/>
    }
    if (error) {
        return <LoadingSkeleton/>;
    }
    return (
        <>
            {loadingRegister ?(<AuthSkeleton/>) :
                (<section className="flex flex-col self-stretch my-auto min-w-[240px]">
                <div className="flex flex-col max-w-full w-[400px]">
                    <div className="flex flex-col self-start text-black">
                        <h1 className="self-start text-4xl break-normal font-bold tracking-normal text-neutral-800 hover:scale-105 transform uppercase">
                            Tạo mật khẩu mới với TLO
                        </h1>
                    </div>
                    <form className="flex flex-col mt-12 w-full max-md:mt-10" onSubmit={handleSubmit}>
                        <div className="flex flex-col mt-10 w-full gap-2">
                            <label htmlFor="newPassword" className="text-base text-black opacity-40">
                                Mật khẩu mới
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm shadow-lg rounded-lg hover:shadow-2xl hover:shadow-gray-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={credentials.newPassword}
                                onChange={(e) => setCredentials({...credentials, newPassword: e.target.value})}
                                placeholder="Nhập mật khẩu mới ở đây"
                                required
                            />
                        </div>
                        <div className="flex flex-col mt-10 w-full gap-2">
                            <label htmlFor="confirmPassword" className="text-base text-black opacity-40">
                                Nhập lại mật khẩu
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm shadow-lg rounded-lg hover:shadow-2xl hover:shadow-gray-400 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={credentials.confirmPassword}
                                onChange={(e) => setCredentials({...credentials, confirmPassword: e.target.value})}
                                placeholder="Xác nhận mật khẩu mới"
                                required
                            />
                        </div>
                        <div className="flex gap-10 items-center mt-10 text-base">
                            <button
                                type="submit"
                                className="flex-col self-stretch my-auto bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 hover:bg-gradient-to-br font-medium text-neutral-50 gap-2.5 px-12 py-4 bg-red-500 rounded max-md:px-5"
                                disabled={loading}
                            >
                                {loading ? (<LoadingSkeleton/>) : 'Tạo mật khẩu'}
                            </button>
                        </div>
                        {error && <p className="text-red-500 mt-4">Login failed: {error}</p>}
                        <div className="flex gap-4 items-center mt-8 text-base text-black">
                            <p className="self-stretch my-auto opacity-70">Bạn chưa có tài khoản?</p>
                            <div
                                className="flex flex-col self-stretch my-auto font-medium w-[100px] hover:shadow hover:shadow-gray-200 hover:bg-pink-200">
                                <a href="/signup"
                                   className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
                                    Tạo tài khoản
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </section>)
            }
        </>


    );
}

export default ChangePasswordComponent;

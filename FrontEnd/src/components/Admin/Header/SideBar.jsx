import {useLogout} from "../../../hook/index.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const links = [
        { name: "Báo cáo", url: "/admin/dashboard"  , src : "/icon/dashboard-100.png"},
        { name: "Sản Phẩm", url: "/admin/product"  ,src : "/icon/product-50.png"},
        { name: "Danh Mục", url: "/admin/category",src : "/icon/category-100.png" },
        { name: "Nhân viên", url: "/admin/employee" ,src : "/icon/employee-100.png"},
        { name: "Khách hàng", url: "/admin/customer" ,src : "/icon/customer-100.png"},
    ];
    const [background , setBackground] = useState(null);
    const {loading , logout} = useLogout();
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if(accessToken){
            const decodedToken = jwtDecode(accessToken);
            setBackground(decodedToken.background);
        }
    }, [accessToken]);
    return (
        <>
            {/* button for Mobile  */}
            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd"
                          d="M2 4.75A.75.75 0 012.75 4h14.5a    .75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="logo-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                   aria-label="Sidebar">
                <div className="h-full px-3 pb-4 flex-1  py-4   overflow-y-auto bg-white dark:bg-gray-800">
                    <div className="pb-6 border-b p-2 border-gray-200 dark:border-gray-700">
                        <a href="/admin/" className="flex ms-2 md:me-24">
                            <img src="/Logo.png" className="h-8 me-3"
                                 alt="FlowBite Logo"/>
                            <span
                                className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">TLO shopping</span>
                        </a>
                    </div>
                    <ul className="space-y-2 p-2 font-medium">
                        {links.map((link) => (
                            <li key={link.url}>
                                <a href={link.url}
                                   className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                {/*<img src={link.src} className="" />*/}
                                    <img src={link.src} alt={link.name} className="w-10 h-10"/>
                                    <span className="ms-3">{link.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="py-4 p-2 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={logout}
                            disabled={loading}
                            className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <img src="/icon/logout-50.png" alt="Đăng xuất" className="w-10 h-10"/>
                            <span className="ms-3">Đăng xuất</span>
                        </button>

                        <button
                            onClick={() =>{
                                navigate("/admin/profile")
                            }}
                            className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700rounded-full">
                            <img
                                src={background ? `${import.meta.env.VITE_BASE_URL}/images/${background}` : '/bg.png'}
                                alt="Avatar"
                                className="w-10 h-10 object-cover rounded-full shadow-gray-300 shadow-xl hover:scale-125"
                            />
                            <span className="ms-3">Tài khoản</span>
                        </button>
                    </div>
                </div>

            </aside>
        </>

    );
};

export default SideBar;

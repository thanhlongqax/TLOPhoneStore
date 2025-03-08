import {useLogout} from "../../hook/index.jsx";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
function Sidebar() {
    const links = [
        { name: "Báo cáo", url: "/"  , src : "/icon/dashboard-100.png"},
        { name: "Sản Phẩm", url: "/product"  ,src : "/icon/product-50.png"},
        { name: "Danh Mục", url: "/category",src : "/icon/category-100.png" },
        { name: "Khách hàng", url: "/customer" ,src : "/icon/customer-100.png"},
    ];
    const navigate = useNavigate();
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
        <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
            <div className="flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2">
                <img src="/Logo.png" alt="Logo" />
            </div>
            <nav className="flex flex-1 flex-col gap-y-4 pt-10">
                {links.map((link, index) => (
                    <a href={link.url} key={index} className="group relative rounded-xl p-2 text-blue-600 border border-gray-300 hover:bg-gray-100">
                        <div className="w-10 h-10">
                            <img src={link.src} className="h-full w-full" alt={link.name}/>
                        </div>

                        <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div
                                className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div className="absolute inset-0 -left-1 flex items-center">
                                    <div className="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                {link.name}
                            </div>
                        </div>
                    </a>
                ))}

            </nav>


            <div className="flex flex-col items-center gap-y-4 py-10 ">
                <button onClick={logout} disabled={loading} className="mt-2 rounded-full group relative hover:scale-125">
                    <img className="h-10 w-10 rounded-full " src="/icon/icons8-log-out-100.png"
                         alt="Đăng xuất"/>
                    <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex ">
                        <div
                            className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                            <div className="absolute inset-0 -left-1 flex items-center">
                                <div className="h-2 w-2 rotate-45 bg-white"></div>
                            </div>
                            Đăng xuất
                        </div>
                    </div>
                </button>
                <button
                    onClick={()=> {
                        navigate("/profile")
                    }}
                    className="group relative rounded-full p-2 text-gray-400 hover:bg-gray-100">
                    <img
                        src={background? `${import.meta.env.VITE_BASE_URL}/images/${background}` : '/bg.png'}
                        alt="Avatar"
                        className="w-10 h-10 object-cover rounded-full shadow-gray-300 shadow-xl hover:scale-125"
                    />
                </button>

            </div>
        </aside>
    );
};

export default Sidebar;

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', url: '/admin/dashboard', active: true },
  { label: 'Sản phẩm', url: '/admin/product' },
  { label: 'Bộ sưu tập', url: '/admin/collection' },
  { label: 'Đơn hàng', url: '/admin/order' },
  { label: 'Hộp thư', url: '/admin/messages' },
  { label: 'Product Stock', url: '/admin/stock' },
  { label: 'Tài Khoản', url: '/admin/account' },
];

function Sidebar() {
  const location = useLocation();
  const [activeUrl, setActiveUrl] = useState(location.pathname); 

  return (
    <aside className="flex flex-col max-md:ml-0 max-md:w-full">
      <nav className="flex flex-col pt-6 pb-24 mx-auto w-full bg-white text-neutral-800 max-md:pb-24">
        <div className="self-center text-xl mb-5 font-extrabold text-blue-500">
          <a href="/admin/dashboard">TLO<span className="text-neutral-800"> Shopping</span></a>
        </div>
        {menuItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.url} 
            className={`flex gap-4 pt-5 pb-5 px-10 py-3.5 whitespace-nowrap ${activeUrl === item.url ? 'bg-blue-500 text-white' : 'bg-white'} max-md:px-5`}
            onClick={() => setActiveUrl(item.url)} 
          >
            <div className="text-2xl font-medium text-center"></div>
            <div className="grow shrink my-auto text-sm font-semibold tracking-wide w-[118px]">{item.label}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

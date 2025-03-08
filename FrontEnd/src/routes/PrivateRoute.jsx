import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import {notifyError} from "../../utils/index.jsx";
import {jwtDecode} from "jwt-decode";
const PrivateRoute = ({ component: Component, roles, layout: Layout }) => {

    const accessToken = localStorage.getItem('accessToken') ;

    const [isHasPassword, setIsHasPassword] = useState(null);
    const [isHasNotification , setIsHasNotification] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decodedToken.exp < currentTime) {
                    notifyError("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
                    navigate('/login');
                    return;
                }
                if (!decodedToken.role) {
                    navigate('/login');
                    return;
                }
                if (!roles || roles.includes(decodedToken.role)) {
                    return;
                } else {
                    notifyError("Bạn không có quyền truy cập vào trang này.Vui lòng đăng nhập lại");
                    navigate('/login');
                }
                setIsHasPassword(decodedToken.isHasPassword || false);
            } catch (error) {
                console.error("Lỗi giải mã token:", error);
                notifyError("Token hết hạn.Vui lòng đăng nhập lại");
                navigate('/login');
            }
        } else {
            notifyError("Bạn cần đăng nhập để truy cập trang này.");
            navigate('/login');
        }
    }, [accessToken, roles, navigate ]);
    if (!accessToken) {
        notifyError("Bạn cần đăng nhập để truy cập trang này.");
        navigate('/login')
    }
    if (isHasPassword === null) {
        if(accessToken){
            const decodedToken = jwtDecode(accessToken);
            setIsHasPassword(decodedToken.isHasPassword);
        }
    }
    if(isHasPassword === false){
        if(isHasNotification === false){
            notifyError("Vui lòng thiết lập mật khẩu. Bạn chỉ có thể đăng xuất");
            setIsHasNotification(true);
        }

        return <Layout></Layout>
    }

    return (
        <Layout>
            <Component />
        </Layout>
    );
};
PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.elementType,
};
export default PrivateRoute;

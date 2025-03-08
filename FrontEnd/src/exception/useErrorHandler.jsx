import { useNavigate } from 'react-router-dom';

const useErrorHandler = () => {
    const navigate = useNavigate();

    const handleError = (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Xử lý mã lỗi 401: Chuyển hướng đến trang đăng nhập
                    navigate('/login');
                    break;
                case 403:
                    // Xử lý mã lỗi 403: Hiển thị thông báo không có quyền
                    alert("Bạn không có quyền truy cập vào trang này.");
                    break;
                case 404:
                    // Xử lý mã lỗi 404: Trang không tìm thấy
                    alert("Trang bạn tìm kiếm không tồn tại.");
                    navigate('/404'); // Chuyển hướng đến trang 404 nếu có
                    break;
                case 500:
                    // Xử lý mã lỗi 500: Lỗi máy chủ
                    alert("Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.");
                    break;
                case 502:
                    // Xử lý mã lỗi 502: Lỗi cổng không hợp lệ
                    alert("Có lỗi với máy chủ. Vui lòng thử lại sau.");
                    break;
                case 503:
                    // Xử lý mã lỗi 503: Dịch vụ không khả dụng
                    alert("Dịch vụ hiện không khả dụng. Vui lòng thử lại sau.");
                    break;
                default:
                    // Xử lý các lỗi khác
                    console.error("Có lỗi xảy ra:", error.message);
                    break;
            }
        } else {
            // Lỗi không phải từ phản hồi (network error, timeout, etc.)
            console.error("Có lỗi xảy ra:", error.message);
        }
    };

    return { handleError };
};

export default useErrorHandler;

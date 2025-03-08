import { toast } from 'react-toastify';

const showToast = (message, type = 'info', duration = 1000) => {
    switch (type) {
        case 'success':
            toast.success(message, {autoClose: duration});
            break;
        case 'error':
            toast.error(message, {autoClose: duration});
            break;
        case 'info':
            toast.info(message, {autoClose: duration});
            break;
        case 'warn':
            toast.warn(message, {autoClose: duration});
            break;
        default:
            toast(message, {autoClose: duration});
            break;
    }
}
export const notifyLogin = () => showToast("Đăng nhập thành công!", "success");
export const notifyRegister = () => showToast("Đăng ký thành công!", "success");
export const notifyRegisterMessage = (message) => showToast(message, "success");

export const notifyLogout = () => showToast("Đăng xuất thành công!", "warn");
export const notifyError = (error) => showToast(`Lỗi: ${error}`, "error");
export const notifyAddProduct = () => showToast("Thêm sản phẩm thành công", "success");
export const notifyEditProduct = () => showToast("Chỉnh sửa sản phẩm thành công", "info");
export const notifyDeleteProduct = () => showToast("Xóa sản phẩm thành công", "warn");

// category
export const notifyAddCategory = () => showToast("Thêm danh mục thành công", "success");
export const notifyEditCategory = () => showToast("Chỉnh sửa danh mục thành công", "info");
export const notifyDeleteCategory = () => showToast("Xóa danh mục thành công", "warn");
export const notifyCategoryMessage = (message) => showToast(message, "info");

export const notifyAddEmployee = () => showToast("Thêm tài khoản nhân viên thành công", "success");
export const notifyEditEmployee = () => showToast("Chỉnh sửa tài khoản nhân viên thành công", "info");
export const notifyEmployeeMessage = (message) => showToast(message, "warn");
export const notifyDeleteEmployee = () => showToast("Xóa tài khoản nhân viên thành công" , "warn");
export const notifySendEmailEmployee = () => showToast("Gửi email reset passoword nhân viên thành công", "success");

//order
export const notifyAddOrder = () => showToast("Thêm đơn hàng thành công", "success");
export const notifyOrderMessage = (message) => showToast(message, "warn");

//báo cáo
export const notifyErrorReport = (message) => showToast(message, "warn");
export const notifyGetReport = (message) => showToast(message, "success");

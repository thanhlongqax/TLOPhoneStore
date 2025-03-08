import {
    DashBoard,
    ErrorPage,
    LoginComponent,
    SignUpComponent,
    ChangePasswordComponent,
    ProductDetails,
    AddProduct,
    EditProduct,
    AddCategory,
    EditCategory,
    AddEmployee,
    ViewEmployee,
    OrderUserPage,
    DashBoardUser,
    AdminProfile,
    OrderDetail,
    OrderAdminDetail,
    ViewCustomer,
    UserProfile,
    OrderPageAdmin
} from '../components';
import {
    ProductPage,
    CategoryPage,
    AdminPageLayout,
    AuthPageLayout,
    CustomerPage,
    EmployeePage,
    OrderPage, UserPageLayout, ProductUserPage, CategoryUserPage, CustomerUserPage
} from "../pages"

//public and private Route
const DefaultRoute = [
    {path : 'login' , component: LoginComponent , layout : AuthPageLayout ,},
    {path : 'confirm' , component: ChangePasswordComponent , layout : AuthPageLayout},
    {path : 'signup' , component: SignUpComponent ,layout : AuthPageLayout ,roles: ["ADMIN"]},

    {path : 'changPassword' , component: ChangePasswordComponent ,layout : AuthPageLayout },

    {path : 'dashboard' , component : DashBoardUser, layout : UserPageLayout , roles: ["USER"]},
    {path : '/' , component : DashBoardUser, layout : UserPageLayout , roles: ["USER"]},
    {path : 'product' , component : ProductUserPage, layout : UserPageLayout , roles: ["USER"]},
    {path : 'order' , component : OrderUserPage, layout : UserPageLayout , roles: ["USER"]},

    {path : 'category' , component : CategoryUserPage, layout : UserPageLayout , roles: ["USER"]},

    {path : 'profile' , component : UserProfile, layout: UserPageLayout,roles: ["USER"]},

    {path : 'customer' , component : CustomerUserPage, layout : UserPageLayout , roles: ["USER"]},

    {path : 'customer/historyOrder/:id' , component : OrderPage, layout: UserPageLayout,roles: ["USER"]},

    {path : '/customer/details/:id' , component : ViewCustomer,layout:UserPageLayout ,roles: ["ADMIN" , "USER"]},

    {path : '/user/order/details/:id' , component : OrderDetail,roles: ["USER","ADMIN"]},

    {path : 'admin/' , component : DashBoard, layout : AdminPageLayout , roles: ["ADMIN"]},
    {path : 'admin/dashboard' , component : DashBoard, layout : AdminPageLayout , roles: ["ADMIN"]},
    {path : 'admin/profile' , component : AdminProfile, layout : AdminPageLayout , roles: ["ADMIN"]},
    {path : 'admin/product' , component : ProductPage, layout : AdminPageLayout , roles: ["ADMIN"]},
    {path : 'admin/product/addProduct' , component : AddProduct , roles: ["ADMIN"]},
    {path : 'admin/product/editProduct/:id' , component : EditProduct , roles: ["ADMIN"]},
    {path : 'admin/category' , component : CategoryPage , layout : AdminPageLayout , roles: ["ADMIN"]},
    {path : 'admin/category/addCategory' , component : AddCategory ,roles: ["ADMIN"]},
    {path : 'admin/category/editCategory/:id' , component : EditCategory ,roles: ["ADMIN"]},
    {path : 'admin/employee' , component : EmployeePage , layout : AdminPageLayout ,roles: ["ADMIN"]},
    {path : 'admin/employee/addEmployee' , component : AddEmployee ,roles: ["ADMIN"]},
    {path : 'admin/employee/viewEmployee/:id' , component : ViewEmployee,roles: ["ADMIN"]},
    {path : 'admin/customer' , component : CustomerPage,layout: AdminPageLayout,roles: ["ADMIN"]},

    {path : '/admin/customer/details/:id' , component : ViewCustomer,roles: ["ADMIN" , "USER"]},

    {path : '/admin/customer/historyOrder/:id' , component : OrderPageAdmin, layout: AdminPageLayout,roles: ["ADMIN"]},

    {path : '/admin/order/details/:id' , component : OrderAdminDetail,roles: ["ADMIN" , "USER"]},

    {path : 'product/:id' ,component : ProductDetails ,},

    {path: '/test'  , layout: AdminPageLayout},
    {path : '/403' , component: ErrorPage , title: "403", message: "Bạn không có quyền truy cập vào trang này, Vui lòng chuyển sang tài khoản Admin"},
    {
        path: '/404',
        component: ErrorPage,
        title: "404",
        message: "Trang bạn tìm không tồn tại. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ."
    },
    {
        path: '/500',
        component: ErrorPage,
        title: "500",
        message: "Đã xảy ra lỗi từ phía máy chủ. Vui lòng thử lại sau hoặc liên hệ với quản trị viên."
    },
    {
        path: '/400',
        component: ErrorPage,
        title: "400",
        message: "Yêu cầu không hợp lệ. Vui lòng kiểm tra lại thông tin và thử lại."
    },
    {
        path: '/401',
        component: ErrorPage,
        title: "401",
        message: "Bạn cần đăng nhập để truy cập vào trang này. Vui lòng đăng nhập và thử lại."
    },
    {
        path: '*',
        component: ErrorPage,
        title: "404",
        message: "Trang bạn tìm không tồn tại. Vui lòng quay về trang chủ.",
    },
];
export {DefaultRoute}
# 📱 TLO Phone Store
📌 *[Xem bản tiếng anh](README.md)*
## 🌟 Giới Thiệu
TLO Phone Store là một nền tảng thương mại điện tử chuyên cung cấp các sản phẩm điện thoại di động. Hệ thống được xây dựng với kiến trúc hiện đại, đảm bảo hiệu suất cao, bảo mật và dễ mở rộng.

## 🛠️ Công Nghệ Sử Dụng
### 🔹 Frontend
- **ReactJS + Vite**: Hiệu suất cao, tối ưu hóa tốc độ tải trang.
- **Tailwind CSS**: Thiết kế giao diện nhanh chóng và linh hoạt.
- **Ant Design (AntD)**: Cung cấp các thành phần UI chuyên nghiệp.
- **Flowbite**: Hỗ trợ UI/UX linh hoạt.
- **Chart.js**: Hiển thị báo cáo thống kê trực quan.

### 🔹 Backend
- **NestJS**: Kiến trúc module giúp phát triển API linh hoạt.
- **Argon2**: Mã hóa mật khẩu an toàn.
- **Passport.js**: Xác thực và quản lý phiên đăng nhập.
- **Swagger**: Cung cấp tài liệu API chi tiết.

### 🔹 Database & Infrastructure
- **MySQL**: Lưu trữ dữ liệu với hệ quản trị quan hệ mạnh mẽ.
- **Nginx**: Cân bằng tải giúp tối ưu hiệu suất.
- **Docker**: Đóng gói backend & frontend thành các container dễ triển khai.

---

## ✨ Tính Năng

### 🏬 **Phía Nhân Viên**
✅ Tạo hóa đơn.  
✅ Xem danh sách sản phẩm.  
✅ Xem danh sách danh mục.  
✅ Quản lý khách hàng.  
✅ Quản lý tài khoản của nhân viên.  
✅ Đăng nhập, đăng xuất, quên mật khẩu (gửi Gmail).  
✅ Báo cáo thống kê: Tổng số tiền nhận, số lượng đơn hàng, tổng sản phẩm đã bán và danh sách đơn hàng.  

### 👑 **Phía Quản Trị**
✅ Quản lý sản phẩm.  
✅ Quản lý danh mục.  
✅ Quản lý nhân viên.  
✅ Quản lý khách hàng.  
✅ Thay đổi mật khẩu.  
✅ Đăng nhập, đăng xuất, tạo tài khoản nhân viên.  
✅ Báo cáo thống kê: Doanh thu, lợi nhuận, tổng số tiền nhận, số lượng đơn hàng, tổng sản phẩm đã bán và danh sách đơn hàng.  

---

## 🚀 Triển Khai Hệ Thống
### 🔧 Yêu Cầu
- **ReactJS và NestJs** (cho backend và frontend).
- **Docker & Docker Compose** (để triển khai).
- **MySQL** (cấu hình database).

### 📦 Chạy Ứng Dụng Bằng Docker
#### 1️⃣ Build & Chạy Containers

## Link youtube : https://www.youtube.com/watch?v=ICKwtgg6HEY
## Dự phòng nếu bị lỗi : https://www.youtube.com/watch?v=4BvvkzxmtiQ

**Lưu ý:** Những lệnh có option là không bắt buộc phải làm (chỉ để mở rộng thêm nếu cần thiết). Dung lượng image khá lớn nên cần mạng WiFi/4G tương đối mạnh để pull chúng về.

**Lưu ý:** Vui lòng ở trong thư mục của dự án là FinalProjectNodeJs và mở bash tại khu vực để liên kết với docker-compose.yml

**Lưu ý:** Vui lòng tự động chuyển port nếu các port trên đây có trùng với các container hiện tại trong máy 
#### chi tiết tại file docker-compose

## Cách 1 Thay đổi email thực tế để test người dùng

### Sau khi khởi động dự án có dùng trình IDE tương tự Dbeaver , MySQL workbench hoặc IDE có thể kết nối vào database của finalProjectNodeJs
### Tiến hành kết nối và thay đổi email quản trị viên và nhân viên bằng IDE

### Tại table user
**Bước 1:** user_id:1 là quản trị viên với role_id : 1 , thay đổi trường email <br>
**Bước 2:** user_id:2 là nhân viên với role_id : 2 , thay đổi trường email <br>
Tại dòng adminUser và regularUser có dòng email thay đổi email người dùng nếu muốn <br>
Tại dòng email thay email đúng để test người dùng trực tiếp

## Cách 2 Thay đổi email thực tế để test người dùng
Đang trong thư mục FinalProjectNodeJs

### Mặc định khi khởi tạo đã có dữ liệu về quản trị viên và nhân viên <br> nhưng về email của 2 người dùng chưa có
**Bước 1:** Tiến hành vào thư mục dự án như sau
**Bước 2:**  Trong thư mục FinalProjectNodeJs/src/service/default.service.ts
**Bước 3:** Tiến hành open file và thêm emai người dùng đã được kích hoạt bên trong
**Bước 4:** tại dòng adminUser và regularUser có dòng email thay đổi email người dùng nếu muốn

## 1. Pull MySQL và Khởi động MySQl trước
sử dụng lệnh sau:
```bash
docker-compose up -d db

```
## 2. Các build lại các dịch vụ từ docker file
sử dụng lệnh sau:
```bash
docker-compose build
```

## 3. Khởi động toàn bộ dự án với Docker Compose:
sử dụng lệnh sau:
```bash
docker-compose up -d

```
## 4. Kiểm Tra Các Docker Đang Chạy
Để kiểm tra các dịch vụ đang chạy trong Docker , sử dụng lệnh sau:
```bash
docker ps
```

## 5. Truy cập vào ứng dụng để trải nghiệm
### Mặc định khi khởi tạo đã có dữ liệu về quản trị viên và nhân viên 
### nhưng về email của 2 người dùng chưa có
### Tài Khoản quản trị viên:
- Username: admin
- Password: 12345678

### Tài Khoản nhân viên:
- Username: user
- Password: 12345678


### Mở trình duyệt để test trên 2 port:
```bash
http://localhost:3000/login  # Giao diện ReactJS để test sản phẩm
http://localhost  # Giao diện Swagger để xem api và document api chi tiết : thông qua nginx

#Tùy chọn để xem thêm server1 và server2

http://localhost:3001  # Giao diện Swagger để xem api và document api chi tiết : thông qua server1
http://localhost:3002  # Giao diện Swagger để xem api và document api chi tiết : thông qua server2
```
`
## 6. Xử Lý Lỗi ( nếu có về trùng port tại máy có sẳn )
Để kiểm tra các dịch vụ đang chạy trong Docker , sử dụng lệnh sau:
```bash
docker logs <container_name>

```
### Sau khi hoàn thành và trải nghiệm sản phẩm

## 7.1 Dừng các container đang chạy và xóa volumes của dự án
Vui lòng ở tại thư mục dự án FinalProjectNodeJs
Để dừng các container trong dự án, bạn có thể sử dụng các lệnh sau:
```bash
docker-compose down --volumes --rmi all

```

## 7.2 Xóa Các Phần Đã Build Trong Dự Án (Nếu muốn xóa từng image để kiểm soát)
Để xóa các phần đã build trong dự án, bạn có thể sử dụng các lệnh sau:
```bash
docker-compose down 
docker rmi finalNodeJS_MYSQL
docker rmi finalprojectnodejs-server1
docker rmi finalprojectnodejs-server2
docker rmi finalprojectnodejs-client
docker rmi nginx
```

### Xin chân thành cảm ơn thầy và những độc giả đã ủng hộ sản phẩm và trải nghiệm chúng.
Cảm ơn thầy rất nhiều đã giúp đỡ nhóm em hoàn thành sản phẩm này.

#### 3️⃣ Truy Cập Ứng Dụng
- **Frontend:** `http://localhost:3000`
- **Backend API (Swagger):** `http://localhost:3001/api`
- **MySQL:** `localhost:3306`

### 🛑 Dừng Hệ Thống
```bash
docker-compose down
```

---

## 📜 Tài Liệu API
Tài liệu API được cung cấp qua **Swagger** tại đường dẫn:
📌 `http://localhost:3001/swagger`

---

## 📷 Giao Diện Ứng Dụng
---

## 🎥 Xem Video Hướng Dẫn Chi Tiết
---

## 👤 Tác Giả
**Thành Long**

📧 **Liên Hệ**: thanhlongndp@gmail.com

## 📜 Giấy Phép
Dự án được phát hành theo giấy phép **MIT**.

---
🚀 *Made with ❤️ by Long*

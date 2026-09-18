# Task Manager

Ứng dụng quản lý công việc đơn giản, gồm backend Spring Boot (REST API + MySQL) và frontend React (Vite + TypeScript + Tailwind CSS).

Dự án học tập cá nhân, tập trung vào việc hiểu trọn vòng đời của một request: từ giao diện React, qua REST API, xuống database, và trả kết quả về lại UI.

## Tính năng

- Tạo / xem / xóa công việc (task)
- Tìm kiếm task theo tiêu đề
- Mỗi task có trạng thái: `Pending`, `In Progress`, `Completed`
- Giao diện dạng Kanban, task được nhóm theo trạng thái

## Công nghệ sử dụng

**Backend**
- Java 21, Spring Boot
- Spring Web, Spring Data JPA
- MySQL
- Lombok

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Axios

## Cấu trúc project

```
Task-Manager/
├── src/main/java/com/project/TaskManager/
│   ├── entity/         # Task.java
│   ├── repository/     # TaskRepository.java
│   ├── controller/     # TaskController.java
│   └── config/         # WebConfig.java (CORS)
├── src/main/resources/
│   └── application.yaml   # cấu hình DB (không được commit, tự tạo — xem hướng dẫn dưới)
└── frontend/
    └── src/
        ├── api/         # gọi API bằng Axios
        ├── components/  # TaskForm, TaskCard, TaskColumn, StatusBadge
        └── types.ts
```

## Cài đặt & chạy

### Backend

1. Tạo database MySQL:
   ```sql
   CREATE DATABASE task_manager;
   ```
2. Tạo file `src/main/resources/application.yaml` (file này không nằm trong git, cần tự tạo):
   ```yaml
   spring:
     application:
       name: Task-Manager

     datasource:
       url: jdbc:mysql://localhost:3306/task_manager
       username: root
       password: your_password

     jpa:
       hibernate:
         ddl-auto: update
       show-sql: true
       properties:
         hibernate:
           format_sql: true
   ```
3. Chạy backend:
   ```bash
   ./mvnw spring-boot:run
   ```
   Backend chạy ở `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy ở `http://localhost:5173`.

## API

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/tasks` | Lấy danh sách tất cả task |
| GET | `/tasks/search?title=...` | Tìm task theo tiêu đề |
| POST | `/tasks` | Tạo task mới |
| DELETE | `/tasks/{id}` | Xóa task theo id |

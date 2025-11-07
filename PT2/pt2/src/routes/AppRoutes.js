//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';
import AddPaymentPage from '../Pages/AddPaymentPage';
import ViewDetailsPage from '../Pages/Viewpage';
import EditPaymentPage from '../Pages/EditPaymentPage';
import UserList from '../Pages/UserList';
import NavigationHeader from '../Components/NavigationHeader';
import { Container } from 'react-bootstrap';

// Component để bảo vệ các route cần xác thực
const PrivateRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Nếu tài khoản không active (locked/blocked/other), hiển thị thông báo ngay trên cùng trang (không redirect)
    if (!user || user.status !== 'active') {
        const msg = user && user.status ? `Tài khoản ${user.status}. Bạn không có quyền truy cập.` : 'Tài khoản không hợp lệ.';
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <div className="alert alert-danger">{msg}</div>
                </Container>
            </>
        );
    }

    // Nếu route yêu cầu admin nhưng user không phải admin -> hiển thị thông báo (không redirect)
    if (requireAdmin && user.role !== 'admin') {
        const msg = 'Bạn không có quyền truy cập.';
        return (
            <>
                <NavigationHeader />
                <Container className="mt-4">
                    <div className="alert alert-warning">{msg}</div>
                </Container>
            </>
        );
    }
    
    return children;
};

const AppRoutes = () => {
    const { isAuthenticated } = useAuth();
    const defaultRedirect = isAuthenticated ? '/home' : '/login';

    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<Navigate to={defaultRedirect} replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home ) */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            {/* Component Trang chủ/Dashboard */}
                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                {/* Payments routes (protected) */}
                <Route
                    path="/payments/add"
                    element={
                        <PrivateRoute>
                            <AddPaymentPage />
                        </PrivateRoute>
                    }
                />
                {/* User Management route (admin only) */}
                <Route
                    path="/users"
                    element={
                        <PrivateRoute requireAdmin={true}>
                            <UserList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/payments/:paymentId"
                    element={
                        <PrivateRoute>
                            <ViewDetailsPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/payments/:paymentId/edit"
                    element={
                        <PrivateRoute>
                            <EditPaymentPage />
                        </PrivateRoute>
                    }
                />
                
                {/* 4. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;

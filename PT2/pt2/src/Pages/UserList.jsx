import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import * as api from '../Services/api';
import UserFilter from '../Components/UserFilter';
import UserTable from '../Components/UserTable';
import NavigationHeader from '../Components/NavigationHeader';
import { Container } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') {
            navigate('/dashboard');
            return;
        }
        fetchUsers();
    }, [currentUser, navigate]);

    const fetchUsers = async () => {
        try {
            const data = await api.getUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleFilterChange = ({ type, value }) => {
        let filtered = [...users];

        switch (type) {
            case 'search':
                filtered = users.filter(user =>
                    user.username.toLowerCase().includes(value.toLowerCase()) ||
                    user.fullName.toLowerCase().includes(value.toLowerCase())
                );
                break;
            case 'role':
                if (value) {
                    filtered = users.filter(user => user.role === value);
                }
                break;
            case 'status':
                if (value) {
                    filtered = users.filter(user => user.status === value);
                }
                break;
            case 'sort':
                if (value) {
                    filtered.sort((a, b) => a[value].localeCompare(b[value]));
                }
                break;
            default:
                break;
        }

        setFilteredUsers(filtered);
    };

    const handleStatusChange = async (userId, newStatus) => {
        try {
            await api.updateUserStatus(userId, newStatus);
            fetchUsers(); // Refresh the list after update
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    return (
        <>
            <NavigationHeader />
            <Container className="my-4">
                <h2>User Management</h2>
                <UserFilter onFilterChange={handleFilterChange} />
                <UserTable users={filteredUsers} onStatusChange={handleStatusChange} />
            </Container>
        </>
    );
};

export default UserList;
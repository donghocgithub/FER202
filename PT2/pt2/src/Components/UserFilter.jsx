import React from 'react';

const UserFilter = ({ onFilterChange }) => {
    const handleSearchChange = (e) => {
        onFilterChange({ type: 'search', value: e.target.value });
    };

    const handleRoleChange = (e) => {
        onFilterChange({ type: 'role', value: e.target.value });
    };

    const handleStatusChange = (e) => {
        onFilterChange({ type: 'status', value: e.target.value });
    };

    const handleSortChange = (e) => {
        onFilterChange({ type: 'sort', value: e.target.value });
    };

    return (
        <div className="row mb-3">
            <div className="col-md-3 mb-2">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by username or full name..."
                    onChange={handleSearchChange}
                />
            </div>
            <div className="col-md-3 mb-2">
                <select className="form-select" onChange={handleRoleChange}>
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
            </div>
            <div className="col-md-3 mb-2">
                <select className="form-select" onChange={handleStatusChange}>
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                    <option value="locked">Locked</option>
                </select>
            </div>
            <div className="col-md-3 mb-2">
                <select className="form-select" onChange={handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="username">Username</option>
                    <option value="fullName">Full Name</option>
                    <option value="role">Role</option>
                    <option value="status">Status</option>
                </select>
            </div>
        </div>
    );
};

export default UserFilter;
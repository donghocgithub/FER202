import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserTable = ({ users, onStatusChange }) => {
    // const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'active':
                return 'bg-success';
            case 'blocked':
                return 'bg-danger';
            case 'locked':
                return 'bg-warning';
            default:
                return 'bg-secondary';
        }
    };

    const handleViewDetails = (userId) => {
        const u = users.find((x) => String(x.id) === String(userId));
        setSelectedUser(u || null);
        setShowModal(true);
    };

    const handleStatusChange = (userId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
        onStatusChange(userId, newStatus);
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.fullName}</td>
                            <td>
                                <span className={`badge ${user.role === 'admin' ? 'bg-primary' : 'bg-info'}`}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <span className={`badge ${getStatusBadgeClass(user.status)}`}>
                                    {user.status}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-info me-2"
                                    onClick={() => handleViewDetails(user.id)}
                                >
                                    View Details
                                </button>
                                <button
                                    className={`btn btn-sm ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                                    onClick={() => handleStatusChange(user.id, user.status)}
                                >
                                    {user.status === 'active' ? 'Ban Account' : 'Activate Account'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* User Details Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser ? (
                        <div>
                            <div className="d-flex align-items-center mb-3">
                                {selectedUser.avatar && (
                                    <img src={selectedUser.avatar} alt="avatar" style={{width:64,height:64,borderRadius:8,marginRight:12}} />
                                )}
                                <div>
                                    <h5 className="mb-0">{selectedUser.fullName}</h5>
                                    <small className="text-muted">{selectedUser.username}</small>
                                </div>
                            </div>
                            <dl className="row">
                                <dt className="col-sm-4">ID</dt>
                                <dd className="col-sm-8">{selectedUser.id}</dd>

                                <dt className="col-sm-4">Username</dt>
                                <dd className="col-sm-8">{selectedUser.username}</dd>

                                <dt className="col-sm-4">Full Name</dt>
                                <dd className="col-sm-8">{selectedUser.fullName}</dd>

                                <dt className="col-sm-4">Role</dt>
                                <dd className="col-sm-8">{selectedUser.role}</dd>

                                <dt className="col-sm-4">Status</dt>
                                <dd className="col-sm-8">{selectedUser.status}</dd>
                            </dl>
                        </div>
                    ) : (
                        <div>No user details available.</div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserTable;
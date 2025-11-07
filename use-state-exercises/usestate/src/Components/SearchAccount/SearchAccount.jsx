// Component tìm kiếm account theo username
import React, { useState } from 'react';

// Danh sách các account gồm id, username, password, avatar
const accounts = [
    { id: 1, username: 'john_doe', password: 'password123', avatar: 'https://i.pravatar.cc/150?img=1' },        
    { id: 2, username: 'jane_smith', password: 'mypassword', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, username: 'alice_jones', password: 'alice2024', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, username: 'bob_brown', password: 'bobsecure    ', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, username: 'charlie_black', password: 'charlie!', avatar: 'https://i.pravatar.cc/150?img=5' },
];

function SearchAccount() {
    const [searchTerm, setSearchTerm] = useState('');   
    
    // Tính toán danh sách được lọc dựa trên searchTerm
    const filteredAccounts = accounts.filter(account =>
        account.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            style={{
                maxWidth: 600,
                margin: '40px auto',
                padding: '24px',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                background: '#f7fafd',
            }}  
        >
            <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 24 }}>
                Tìm kiếm tài khoản theo username
            </h3>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo username..." 
                style={{    
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #90caf9',  
                    marginBottom: 18,
                    fontSize: 16,
                    outline: 'none',
                    boxSizing: 'border-box',    
                }}
            />
            <div>
                <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                    {filteredAccounts.map(account => (
                        <li
                            key={account.id}
                            style={{
                                background: '#e3f2fd',
                                marginBottom: 10,
                                padding: '12px 16px',
                                borderRadius: '8px',
                                fontSize: 16,
                                color: '#333',
                                boxShadow: '0 1px 4px rgba(33,150,243,0.07)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                        >
                            <img
                                src={account.avatar}
                                alt={account.username}
                                style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    borderRadius: '50%',
                                    flexShrink: 0
                                }}
                            />
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '16px', color: '#1976d2' }}>
                                    {account.username}
                                </div>
                                <div style={{ fontSize: '14px', color: '#666' }}>
                                    ID: {account.id}
                                </div>
                            </div>
                        </li>
                    ))}
                    {filteredAccounts.length === 0 && (
                        <li style={{ color: '#888', textAlign: 'center', padding: '20px 0' }}>
                            Không tìm thấy kết quả
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default SearchAccount;
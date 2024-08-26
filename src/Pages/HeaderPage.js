import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

const items = () => [
    { key: '0', label: 'Sign In' },
    { key: '1', label: <UserOutlined style={{ fontSize: '24px' }} /> },
    { key: '2', label: <LogoutOutlined style={{ fontSize: '24px' }} /> }
];

function HeaderPage() {
    return (
        <div>
            <Header
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 24px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    zIndex: 1000,
                    height: '64px',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                    backgroundColor: '#0d416b', // Set the background color here
                   
                }}
            >
                <div className='heading'>Real Estate Management System</div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={items()}
                    style={{
                        fontSize: '20px',
                        flex: 1,
                        justifyContent: 'flex-end',
                        border: 'none',
                        color: '#fff',
                        backgroundColor:'#0d416b'
                    }}
                />
            </Header>
        </div>
    );
}

export default HeaderPage;
